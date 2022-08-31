import {useEffect, useState} from 'react';
import {
  appGetSchedlue,
  appGetMeets,
  appPostMeet,
  appPutMeet,
} from '../api/request';
import {DataList} from '../interfaces/components';
import useForm from './useForm';
import {validateDiffDate, validateFormMeet} from '../utils/validate';
import {Meet} from '../interfaces/response';
import moment from 'moment';

interface StateProps {
  dataList: DataList[];
  dataMeets: Meet[];
  loading: boolean;
  visible: boolean;
  dateVisible: boolean;
  loadingMeet: boolean;
  active: Meet | undefined;
}

const useSchedule = () => {
  const [data, setData] = useState<StateProps>({
    dataList: [],
    dataMeets: [],
    loading: true,
    visible: false,
    dateVisible: false,
    loadingMeet: false,
    active: undefined,
  });

  const [dataDate, setDataDate] = useState({date_meet: '', start_time: ''});

  const {meet, link, handleChangeText, reset, resetFormValues} = useForm({
    meet: '',
    link: '',
  });

  const getDataSchedule = async () => {
    const dataList = await appGetSchedlue();
    const dataMeets = await appGetMeets();
    const dataResp: DataList[] = [];
    dataList.schedlue.forEach((item, i) => {
      const {day, schedlue} = item;
      const data = schedlue.map(item => item);
      dataResp[i] = {title: day, data};
    });
    const dataMeetResp = dataMeets.map(item => meetResponse(item));
    setData({
      ...data,
      dataList: dataResp,
      dataMeets: dataMeetResp,
      loading: false,
    });
  };

  const handleConfirm = (e: Date) => {
    const validateDate = validateDiffDate(e);
    if (!validateDate) return;
    const {date, hour} = validateDate;
    setData({...data, dateVisible: false});
    setDataDate({date_meet: date, start_time: hour});
  };

  const handleVisible = () => {
    if (meet || link) reset();
    if (dataDate.date_meet) setDataDate({date_meet: '', start_time: ''});
    const {dateVisible} = data;
    if (dateVisible) setData({...data, dateVisible: false});
    setData({...data, visible: !data.visible});
  };

  const handleDateVisible = () =>
    setData({...data, dateVisible: !data.dateVisible});

  const handleSave = async () => {
    const {date_meet, start_time} = dataDate;
    const form = {meet, date_meet, start_time, link};
    const validate = validateFormMeet(form);
    if (!validate) return;
    const {active} = data;
    setData({...data, loadingMeet: true});
    if (active) {
      const meetResp = await appPutMeet(form, active._id);
      setData({...data, loadingMeet: false});
      if (!meetResp) return;
      setData({
        ...data,
        dataMeets: data.dataMeets.map(item =>
          item._id === meetResp._id ? meetResponse(meetResp) : item,
        ),
        visible: false,
      });
      setDataDate({start_time: '', date_meet: ''});
      reset();
      return;
    }
    const meetResp = await appPostMeet(form);
    setData({...data, loadingMeet: false});
    if (!meetResp) return;
    setData({
      ...data,
      dataMeets: [...data.dataMeets, meetResponse(meetResp)],
      visible: false,
    });
    reset();
    setDataDate({date_meet: '', start_time: ''});
  };

  const handleActiveMeet = async (meetData: Meet) => {
    const {meet, link, start_time, date_meet} = meetData;
    resetFormValues({meet, link});
    setDataDate({date_meet, start_time});
    setData({...data, visible: true, active: meetData});
  };

  const meetResponse = (data: Meet) => {
    const spliteDate = data.date_meet.split('T');
    const meetSave = {...data, date_meet: spliteDate[0]};
    return meetSave;
  };

  useEffect(() => {
    getDataSchedule();
  }, []);

  return {
    ...data,
    getDataSchedule,
    handleVisible,
    handleDateVisible,
    handleConfirm,
    handleChangeText,
    meet,
    link,
    handleSave,
    handleActiveMeet,
    ...dataDate,
  };
};

export default useSchedule;
