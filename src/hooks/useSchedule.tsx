import {useEffect, useState} from 'react';
import {appGetSchedlue} from '../api/request';
import {DataList} from '../interfaces/components';

const useSchedule = () => {
  const [dataList, setDataList] = useState<DataList[]>([]);
  const [loading, setLoading] = useState(true);
  const getDataSchedule = async () => {
    const data = await appGetSchedlue();
    setLoading(false);
    const dataResp: DataList[] = [];
    data.schedlue.forEach((item, i) => {
      const {day, schedlue} = item;
      const data = schedlue.map(item => item);
      dataResp[i] = {title: day, data};
    });
    setDataList(dataResp);
  };
  useEffect(() => {
    getDataSchedule();
  }, []);
  return {
    loading,
    dataList,
    getDataSchedule,
  };
};

export default useSchedule;
