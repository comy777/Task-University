import {useEffect, useState} from 'react';
import useForm from './useForm';
import {appSearch} from '../api/request';
import {SearchResponse, Lesson} from '../interfaces/response';
import {useNavigation} from '@react-navigation/native';

const useDebounce = (time: number = 500) => {
  const {input, handleChangeText} = useForm({input: ''});
  const [data, setData] = useState<SearchResponse[]>([]);
  const navigation = useNavigation();
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!input) {
        if (data.length > 0) setData([]);
        return;
      }
      handleSearch(input);
    }, time);
    return () => {
      clearTimeout(timeout);
    };
  }, [input]);
  const handleSearch = async (search: string) => {
    const resp = await appSearch(search);
    setData(resp);
  };
  const handleClick = (item: any) => {
    const {type} = item;
    if (type === 'lesson') {
      navigation.navigate('create lesson', {lesson: item});
      return;
    }
    if (type === 'note') {
      navigation.navigate('create note', {note: item, lesson: item.lesson});
      return;
    }
    if (type === 'task') {
      navigation.navigate('create task', {task: item, lesson: item.lesson});
      return;
    }
  };
  return {handleChangeText, input, data, handleClick};
};

export default useDebounce;
