import useContextApp from './useContextApp';
import {
  appDeleteRequest,
  appGetLessons,
  appPostLessons,
  appPutLessons,
  authUserRequest,
} from '../api/request';
import useStyles from './useStyles';
import useForm from './useForm';
import {
  formDataApp,
  validateLesson,
  getDaysValidate,
  setDataDays,
} from '../utils/validate';
import {Lesson} from '../interfaces/response';
import {DayProps, ScreenStack} from '../interfaces/components';
import {DataLessonSave} from '../interfaces/data';
import {showAlert} from '../utils/toast';
import {useNavigation} from '@react-navigation/native';
import {dataDays} from '../utils/storage';

const useApp = (data?: Lesson) => {
  const navigation = useNavigation();
  const {
    lessons,
    setLessons,
    setLoading,
    loading,
    setVisibleTabBar,
    visibleTabBar,
    setDay,
    setModal,
    day,
    setChildren,
    children,
    setSchedlue,
    schedlue,
    setDays,
    days,
    restoreLesson,
    setUser,
  } = useContextApp();
  const {styles, colors} = useStyles();
  const form = formDataApp('lesson');
  const {lesson, teacher, nrc, handleChangeText, reset, resetFormValues} =
    useForm(form);

  const handleGetLessons = async () => {
    setLoading();
    const user = await authUserRequest('get');
    if (!user) return;
    setUser(user);
    const resp = await appGetLessons('/lessons');
    setLoading();
    if (!resp) return;
    setLessons(resp);
  };
  const handleChangeDay = (day: string) => {
    const validate = setDataDays({
      days,
      day,
      setDays,
      schedlue,
      selected: true,
      classroom: '',
    });
    if (validate) return;
    setDay(day);
    setChildren('lesson');
    setModal();
  };
  const handleSaveSchedlue = (classroom: string) => {
    const data = classroom ? classroom : 'salon';
    setDataDays({
      days,
      day,
      setDays,
      schedlue: `${data} ${schedlue}`,
      selected: false,
      classroom,
    });
    setModal();
  };
  const handleSaveLesson = async () => {
    const dataDays = getDaysValidate(days);
    const validate = validateLesson({
      lesson,
      teacher,
      nrc,
      classroom: '',
      schedlue: dataDays,
    });
    if (!validate) return;
    setLoading();
    if (data) {
      await handleEdit(validate);
      return;
    }
    const resp = await appPostLessons('lessons', validate);
    setLoading();
    if (!resp) return;
    setLessons([...lessons, resp]);
    reset();
    restoreLesson();
  };
  const handleEdit = async (lesson: DataLessonSave) => {
    if (!data) return;
    const resp = await appPutLessons(`lessons/${data._id}`, lesson);
    setLoading();
    if (!resp) return;
    const newLessons = lessons.map(item =>
      item._id === resp._id ? resp : item,
    );
    setLessons(newLessons);
    reset();
    restoreLesson();
  };
  const handleDelete = async () => {
    if (!data) return;
    setLoading();
    const resp = await appDeleteRequest(`lessons/${data._id}`);
    setLoading();
    if (!resp) return;
    const newLessons = lessons.filter(item => item._id !== data._id);
    setLessons(newLessons);
    reset();
    restoreLesson();
    if (newLessons.length === 0) {
      await appGetLessons('lessons');
    }
    navigation.goBack();
  };
  const showHandleDelete = () => {
    showAlert({
      title: 'Borrar',
      message: 'Seguro que desea borrar esta clase?',
      onPress: handleDelete,
    });
  };
  const handleActive = (data: Lesson) => {
    const {lesson, teacher, nrc, schedlue, classroom} = data;
    const dataSchedlue: DayProps[] = [];
    dataDays.forEach((item, index) => {
      let dataDay: any = null;
      schedlue.forEach(day => {
        if (day.day === item.day) {
          dataDay = {...item, selected: true, schedlue: day.hours};
          return;
        }
      });
      dataDay ? (dataSchedlue[index] = dataDay) : (dataSchedlue[index] = item);
    });
    resetFormValues({lesson, teacher, nrc: nrc.toString()});
    setDays(dataSchedlue);
  };
  const handleNavigate = (screen: ScreenStack) => {
    if (!data) return;
    navigation.navigate(screen, {id: data._id});
  };

  return {
    loading,
    lessons,
    styles,
    setVisibleTabBar,
    visibleTabBar,
    teacher,
    lesson,
    nrc,
    handleChangeText,
    handleChangeDay,
    day,
    setChildren,
    children,
    handleSaveSchedlue,
    schedlue,
    setModal,
    colors,
    setSchedlue,
    days,
    handleSaveLesson,
    handleGetLessons,
    handleActive,
    showHandleDelete,
    handleNavigate,
  };
};

export default useApp;
