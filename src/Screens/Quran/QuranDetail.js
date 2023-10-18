import { useIsFocused } from '@react-navigation/native';
import React,{ useEffect,useRef,useState } from 'react';
import { FlatList,Text,TouchableOpacity,View } from 'react-native';
import ActionSheet,{ SheetManager } from 'react-native-actions-sheet';
import SoundPlayer from 'react-native-sound-player';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useDispatch,useSelector } from 'react-redux';
import Tafseer from '../../Components/ActionSheets/Tafseer/Tafseer';
import Translation from '../../Components/ActionSheets/Translation';
import Loader from '../../Components/Loader';
import PrevNextButtons from '../../Components/PrevNextButtons';
import TranslationReading from '../../Components/TranslationReading';
import { TAFSEER,TRANSLATION } from '../../Utils/ActionSheetConstant';
import getActionSheetStyle from '../../Utils/ActionSheetStyle';
import { SurahName } from '../../Utils/suraName';
import useTheme1 from '../../Utils/useTheme1';
import { SurahsDetail } from '../../redux/actions';
import getStyle from './Styles';

// let audio = false;
const QuranDetail = ({ route, navigation }) => {
  const IsFocused = useIsFocused();
  const { styles } = getStyle();
  const { txtWhite } = useTheme1();
  const { ActionSheetStyle } = getActionSheetStyle();
  const commonStyles = styles;
  const { data, firstName, secondName, thirdName } = route.params;
  const { surah_detail } = useSelector((states) => states.userReducer);
  const dispatch = useDispatch();
  const Firstname = useRef(firstName);
  const SecondName = useRef(secondName);
  const ThirdName = useRef(thirdName);
  const suranNumber = useRef(data);
  const [state, setState] = useState({
    lang_toggle: false,
    accordian: null,
    reading: false,
    play: false,
    song: false,
    data: [],
    tafseerText: '',
    loader: false,
  });

  // if (!audio) {
  //   let song;
  //   let songNumber = Number(suranNumber.current);
  //   if (songNumber < 10) {
  //     song = `00${songNumber}`;
  //   } else if (songNumber > 9 && songNumber < 100) {
  //     song = `0${songNumber}`;
  //   } else {
  //     song = songNumber;
  //   }
  //   Sound.setCategory('Playback');
  //   audio = new Sound(`https://server6.mp3quran.net/akdr/${song}.mp3`, '', (error) => {
  //     if (error) {
  //       console.log('failed to load the sound', error);
  //       return;
  //     }
  //   });
  //   // audio = SoundPlayer.playUrl(`https://server6.mp3quran.net/akdr/${song}.mp3`);
  //   console.log('______AUDIO______');
  // }

  const UpdateNames = async (number) => {
    const filteredData = await SurahName.find((item) => item.number === Number(number));
    SecondName.current = filteredData.englishName;
    ThirdName.current = filteredData.englishNameTranslation;
    Firstname.current = filteredData.name;
  };
  const returningData = (nxtprev) => {
    if (nxtprev) {
      const lang = state.lang_toggle ? 'english_saheeh' : 'urdu_junagarhi';
      return surah_detail.find((item) => item.number === suranNumber.current && item.lang === lang);
    } else {
      const lang = state.lang_toggle ? 'english_saheeh' : 'urdu_junagarhi';
      return surah_detail.find((item) => item.number === suranNumber.current && item.lang === lang);
    }
  };
  const DispatchingNextPrevFunc = (nxtprev) => {
    if (nxtprev) {
      const lang = state.lang_toggle ? 'english_saheeh' : 'urdu_junagarhi';
      if (!surah_detail.some((item) => item.number === suranNumber.current && item.lang === lang)) {
        if (state.lang_toggle) {
          dispatch(SurahsDetail(suranNumber.current, 'english_saheeh'));
        }
        if (!state.lang_toggle) {
          dispatch(SurahsDetail(suranNumber.current, 'urdu_junagarhi'));
        }
      } else {
        const temdata = returningData(nxtprev);
        setState({ ...state, data: temdata?.data?.result });
      }
    } else {
      const lang = state.lang_toggle ? 'english_saheeh' : 'urdu_junagarhi';
      if (!surah_detail.some((item) => item.number === suranNumber.current && item.lang === lang)) {
        if (state.lang_toggle) {
          dispatch(SurahsDetail(suranNumber.current, 'english_saheeh'));
        }
        if (!state.lang_toggle) {
          dispatch(SurahsDetail(suranNumber.current, 'urdu_junagarhi'));
        }
      } else {
        const temdata = returningData();
        setState({ ...state, data: temdata?.data?.result });
      }
    }
  };
  const onPressNext = async () => {
    const number = suranNumber.current + 1;
    suranNumber.current = number;
    UpdateNames(number);
    DispatchingNextPrevFunc('next');
    SoundPlayer.stop();
    setState((prev) => ({ ...prev, play: false }));
    console.log('___NEXT___');
  };
  const onPressPrev = () => {
    const number = suranNumber.current - 1;
    suranNumber.current = number;
    UpdateNames(number);
    DispatchingNextPrevFunc('prev');
    SoundPlayer.stop();
    // setState({ ...state, play: false });
    setState((prev) => ({ ...prev, play: false }));
    console.log('___PREVIOUS___');
  };
  const onPressTafseer = (text) => {
    setState({ ...state, tafseerText: text });
    SheetManager.show(TAFSEER);
  };
  const onPressTranslationButton = () => {
    setState({ ...state, lang_toggle: !state.lang_toggle });
  };
  const onPressTranslationArrow = () => {
    SheetManager.show(TRANSLATION);
  };

  useEffect(() => {
    const temdata = returningData();
    setState({ ...state, data: temdata?.data?.result });
  }, [surah_detail]);
  useEffect(() => {
    DispatchingNextPrevFunc();
  }, [state.lang_toggle]);

  const onPressPlayPause = () => {
    let song;
    let songNumber = Number(suranNumber.current);
    if (songNumber < 10) {
      song = `00${songNumber}`;
    } else if (songNumber > 9 && songNumber < 100) {
      song = `0${songNumber}`;
    } else {
      song = songNumber;
    }
    if (!state.play) {
      SoundPlayer.playUrl(`https://server6.mp3quran.net/akdr/${song}.mp3`);
      // setState({ ...state, play: true });
      setState((prev) => ({ ...prev, play: true }));
    } else {
      SoundPlayer.pause();
      // setState({ ...state, play: false });
      setState((prev) => ({ ...prev, play: false }));
    }
  };

  useEffect(() => {
    return () => {
      // if (audio) {
      setState((prev) => ({ ...prev, play: false }));
      // setState({ ...state, play: false });
      SoundPlayer.stop();
      console.log('___BACK___');
      // }
    };
  }, []);

  return (
    <>
      <ActionSheet id={TAFSEER} containerStyle={ActionSheetStyle.container}>
        <Tafseer text={state.tafseerText} lang={state.lang_toggle} />
      </ActionSheet>
      <ActionSheet id={TRANSLATION} containerStyle={ActionSheetStyle.container}>
        <Translation state={state} onPress={onPressTranslationButton} />
      </ActionSheet>
      <Loader />
      <View style={commonStyles.root}>
        <View style={commonStyles.heading_container}>
          <Text style={commonStyles.heading_text}>{SecondName.current}</Text>
          <Text style={commonStyles.heading_text}>({ThirdName.current})</Text>
          <Text style={commonStyles.heading_text}>{Firstname.current}</Text>
        </View>
        <View style={commonStyles.button_container}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <AntDesign
              name={!state.play ? 'play' : 'pausecircle'}
              size={25}
              color={txtWhite}
              onPress={() => onPressPlayPause()}
            />
            <Text
              style={{
                color: txtWhite,
                fontSize: 16,
                fontWeight: '600',
                marginLeft: 5,
              }}
            >
              {!state.play ? 'Play  ' : 'Pause'}
            </Text>
          </View>
          <TranslationReading state={state} setState={setState} onPress={onPressTranslationArrow} />
        </View>
        <View style={commonStyles.flatlist_root}>
          <FlatList
            data={state.data}
            keyExtractor={(item, index) => index}
            renderItem={({ item, index }) => {
              return (
                <>
                  <View
                    style={[
                      commonStyles.flatlist_card_container,
                      index === 0 ? { marginTop: 10 } : null,
                    ]}
                  >
                    <View style={styles.tafseerRow}>
                      <View>
                        <Text style={styles.tafseerText}>
                          {item.sura}:{index + 1}
                        </Text>
                      </View>
                      <View>
                        {!state.reading ? (
                          <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={() => onPressTafseer(item.footnotes)}
                          >
                            <Text style={styles.tafseerText}>Tafseer</Text>
                          </TouchableOpacity>
                        ) : null}
                      </View>
                    </View>

                    <Text style={commonStyles.flatlist_heading_text}>{item.arabic_text}</Text>
                    {!state.reading ? (
                      <>
                        <Text
                          style={[
                            commonStyles.flatlist_text,
                            !state.lang_toggle ? { textAlign: 'right' } : null,
                          ]}
                        >
                          {item.translation}
                        </Text>
                      </>
                    ) : null}
                  </View>
                  {index + 1 === state.data.length ? (
                    <PrevNextButtons
                      sura={item.sura}
                      onPressNext={onPressNext}
                      onPressPrev={onPressPrev}
                    />
                  ) : null}
                </>
              );
            }}
          />
        </View>
      </View>
    </>
  );
};

export default QuranDetail;
