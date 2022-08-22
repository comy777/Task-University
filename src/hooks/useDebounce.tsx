import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import useForm from './useForm';
import {appSearch} from '../api/request';
import {SearchResponse} from '../interfaces/response';
import {getData, saveData} from '../utils/storage';

const useDebounce = (time: number = 500) => {
  const {input, handleChangeText} = useForm({input: ''});
  const [data, setData] = useState<SearchResponse[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    const timeout = setTimeout(() => {
      handleSearch(input);
    }, time);
    return () => {
      clearTimeout(timeout);
    };
  }, [input]);

  const handleSearch = async (search: string) => {
    if (!input) {
      if (data.length > 0) setData([]);
      const dataStorage = await getData('history');
      if (dataStorage) {
        const dataJson = JSON.parse(dataStorage);
        setHistory(dataJson);
      }
      return;
    }
    const resp = await appSearch(search);
    if (resp.length > 0) {
      setData(resp);
      const inputTrim = input.trim();
      const dataStorage = await getData('history');
      if (dataStorage) {
        const dataJsonGet: string[] = JSON.parse(dataStorage);
        if (dataJsonGet.length >= 7) {
          const data: string[] = [];
          let temporal = '';
          let contador = 0;
          dataJsonGet.forEach((item, i) => {
            if (i === 0) {
              data[contador] = inputTrim;
            }
            temporal = item;
            contador = i + 1;
            data[contador] = temporal;
          });
          if (data.length > 7) data.pop();
          setHistory(data);
          const dataJson = JSON.stringify(data);
          await saveData('history', dataJson);
          return;
        }
        setHistory([inputTrim, ...history]);
        const dataJson = JSON.stringify([inputTrim, ...dataJsonGet]);
        await saveData('history', dataJson);
        return;
      }
      const dataJson = JSON.stringify([input]);
      await saveData('history', dataJson);
    }
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

  const handleGetHistory = async () => {
    const dataStorage = await getData('history');
    if (dataStorage) {
      const dataJson = JSON.parse(dataStorage);
      setHistory(dataJson);
    }
  };

  const handleSearchHistory = async (item: string) => {
    handleChangeText(item, 'input');
    const resp = await appSearch(item);
    if (resp.length > 0) setData(resp);
  };

  const handleDeleteHistoryItem = async (item: string) => {
    console.log(history);
  };

  return {
    handleChangeText,
    input,
    data,
    handleClick,
    handleGetHistory,
    history,
    handleSearchHistory,
    handleDeleteHistoryItem,
  };
};

export default useDebounce;
