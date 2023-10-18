import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import useTheme1 from '../../Utils/useTheme1';
import { PrayerTimesByDate } from '../../redux/actions';
import moment from 'moment';
import { useIsFocused } from '@react-navigation/native';

const PrayerTimingCard = ({ timeAMPM, date, onPress }) => {
  const IsFocused = useIsFocused();
  const { wp, hp, txtWhite, primary } = useTheme1();
  const { hour12, prayerByDate, azanNotification, darkMode } = useSelector(
    (states) => states.userReducer
  );
  const [prayerTime, setPrayerTime] = useState(prayerByDate?.data?.timings);
  const { styles } = useGetstyle();
  const [state, setState] = useState({
    active: 0,
    fajr: '',
    sunrise: '',
    dhuhr: '',
    asr: '',
    maghrib: '',
    isha: '',
  });
  const dt = new Date();
  const hour = dt.getHours() < 10 ? `0${dt.getHours()}` : dt.getHours();
  const minutes = dt.getMinutes() < 10 ? `0${dt.getMinutes()}` : dt.getMinutes();
  const currentTime = `"${hour}:${minutes}"`;
  let dateCurrent = JSON.parse(currentTime);

  // console.log('currentTime==>>>', dateCurrent, prayerTime?.Asr , prayerTime?.Maghrib);
  // console.log(
  //   '==-=--DT=-=-=== ',
  //   dt.getDate() + '-' + `${dt.getMonth() + 1}` + '-' + dt.getFullYear()
  // );
  // console.log('==-=-Date-=-=-=== ', date.getDate(), date.getMonth() + 1, date.getFullYear());

  const checkForBorder_new = () => {
    setState({
      ...state,
      active: 0,
      fajr: '',
      sunrise: '',
      dhuhr: '',
      asr: '',
      maghrib: '',
      isha: '',
    });
    if (
      `"${dt.getDate()}-${dt.getMonth() + 1}-${dt.getFullYear()}"` ===
      `"${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}"`
    ) {
      if (dateCurrent > prayerTime?.Fajr && dateCurrent < prayerTime?.Sunrise) {
        setState({
          ...state,
          active: 1,
          fajr: 'goingon',
          sunrise: 'coming',
          dhuhr: 'coming',
          asr: 'coming',
          maghrib: 'coming',
          isha: 'coming',
        });
      } else if (dateCurrent > prayerTime?.Sunrise && dateCurrent < prayerTime?.Dhuhr) {
        setState({
          ...state,
          active: 2,
          fajr: 'gone',
          sunrise: 'goingon',
          dhuhr: 'coming',
          asr: 'coming',
          maghrib: 'coming',
          isha: 'coming',
        });
      } else if (dateCurrent > prayerTime?.Dhuhr && dateCurrent < prayerTime?.Asr) {
        setState({
          ...state,
          active: 3,
          fajr: 'gone',
          sunrise: 'gone',
          dhuhr: 'goingon',
          asr: 'coming',
          maghrib: 'coming',
          isha: 'coming',
        });
      } else if (dateCurrent > prayerTime?.Asr && dateCurrent < prayerTime?.Maghrib) {
        setState({
          ...state,
          active: 4,
          fajr: 'gone',
          sunrise: 'gone',
          dhuhr: 'gone',
          asr: 'goingon',
          maghrib: 'coming',
          isha: 'coming',
        });
      } else if (dateCurrent > prayerTime?.Maghrib && dateCurrent < prayerTime?.Isha) {
        setState({
          ...state,
          active: 5,
          fajr: 'gone',
          sunrise: 'gone',
          dhuhr: 'gone',
          asr: 'gone',
          maghrib: 'goingon',
          isha: 'coming',
        });
      } else if (dateCurrent > prayerTime?.Isha && dateCurrent > prayerTime?.Fajr) {
        setState({
          ...state,
          active: 6,
          fajr: 'gone',
          sunrise: 'gone',
          dhuhr: 'gone',
          asr: 'gone',
          maghrib: 'gone',
          isha: 'goingon',
        });
      }
    } else if (
      `"${dt.getDate()}-${dt.getMonth() + 1}-${dt.getFullYear()}"` >
      `"${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}"`
    ) {
      setState({
        ...state,
        active: 0,
        fajr: 'gone',
        sunrise: 'gone',
        dhuhr: 'gone',
        asr: 'gone',
        maghrib: 'gone',
        isha: 'gone',
      });
    } else if (
      `"${dt.getDate()}-${dt.getMonth() + 1}-${dt.getFullYear()}"` <
      `"${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}"`
    ) {
      setState({
        ...state,
        active: 0,
        fajr: 'upcoming',
        sunrise: 'upcoming',
        dhuhr: 'upcoming',
        asr: 'upcoming',
        maghrib: 'upcoming',
        isha: 'upcoming',
      });
    }
  };

  const checkForBorder = () => {
    setState({
      ...state,
      active: 0,
      fajr: '',
      sunrise: '',
      dhuhr: '',
      asr: '',
      maghrib: '',
      isha: '',
    });
    if (
      `"${dt.getDate()}-${dt.getMonth() + 1}-${dt.getFullYear()}"` ===
      `"${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}"`
    ) {
      if (currentTime > `"${prayerTime?.Fajr}"` && currentTime < `"${prayerTime?.Sunrise}"`) {
        setState({
          ...state,
          active: 1,
          fajr: 'goingon',
          sunrise: 'coming',
          dhuhr: 'coming',
          asr: 'coming',
          maghrib: 'coming',
          isha: 'coming',
        });
      } else if (
        currentTime > `"${prayerTime?.Sunrise}"` &&
        currentTime < `"${prayerTime?.Dhuhr}"`
      ) {
        setState({
          ...state,
          active: 2,
          fajr: 'gone',
          sunrise: 'goingon',
          dhuhr: 'coming',
          asr: 'coming',
          maghrib: 'coming',
          isha: 'coming',
        });
      } else if (currentTime > `"${prayerTime?.Dhuhr}"` && currentTime < `"${prayerTime?.Asr}"`) {
        setState({
          ...state,
          active: 3,
          fajr: 'gone',
          sunrise: 'gone',
          dhuhr: 'goingon',
          asr: 'coming',
          maghrib: 'coming',
          isha: 'coming',
        });
      } else if (currentTime > `"${prayerTime?.Asr}"` && currentTime < `"${prayerTime?.Maghrib}"`) {
        setState({
          ...state,
          active: 4,
          fajr: 'gone',
          sunrise: 'gone',
          dhuhr: 'gone',
          asr: 'goingon',
          maghrib: 'coming',
          isha: 'coming',
        });
      } else if (
        currentTime > `"${prayerTime?.Maghrib}"` &&
        currentTime < `"${prayerTime?.Isha}"`
      ) {
        setState({
          ...state,
          active: 5,
          fajr: 'gone',
          sunrise: 'gone',
          dhuhr: 'gone',
          asr: 'gone',
          maghrib: 'goingon',
          isha: 'coming',
        });
      } else if (currentTime > `"${prayerTime?.Isha}"` && currentTime > `"${prayerTime?.Fajr}"`) {
        setState({
          ...state,
          active: 6,
          fajr: 'gone',
          sunrise: 'gone',
          dhuhr: 'gone',
          asr: 'gone',
          maghrib: 'gone',
          isha: 'goingon',
        });
      }
    } else if (
      `"${dt.getDate()}-${dt.getMonth() + 1}-${dt.getFullYear()}"` >
      `"${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}"`
    ) {
      setState({
        ...state,
        active: 0,
        fajr: 'gone',
        sunrise: 'gone',
        dhuhr: 'gone',
        asr: 'gone',
        maghrib: 'gone',
        isha: 'gone',
      });
    } else if (
      `"${dt.getDate()}-${dt.getMonth() + 1}-${dt.getFullYear()}"` <
      `"${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}"`
    ) {
      setState({
        ...state,
        active: 0,
        fajr: 'upcoming',
        sunrise: 'upcoming',
        dhuhr: 'upcoming',
        asr: 'upcoming',
        maghrib: 'upcoming',
        isha: 'upcoming',
      });
    }
  };

  const [time, setTime] = useState('');
  const UpdateTime = () => {
    const date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    // var seconds = date.getSeconds();
    // hours = hours % 12;
    // seconds = seconds < 10 ? '0' + seconds : seconds;
    // hours = hours ? hours : 12; // the hour '0' should be '12'
    // minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes;
    setTime(strTime);
  };

  useEffect(() => {
    setInterval(() => {
      UpdateTime();
    }, 1000);
    return () => {
      clearInterval();
    };
  }, [time]);

  useEffect(() => {
    // checkForBorder();
    checkForBorder_new();
    // console.log('-Current Time--- ', dateCurrent, time);
  }, [prayerByDate, dateCurrent, IsFocused, date, timeAMPM, time]);

  return (
    <View
      style={{
        paddingHorizontal: 10,
        width: wp('100%'),
        marginBottom: 10,
      }}
    >
      <TouchableOpacity
        style={[
          {
            ...styles.btnMediumWrap,
            borderColor: txtWhite,
          },
          state.fajr === 'gone'
            ? {
                backgroundColor: darkMode ? primary : '#8aa2ed20',
                borderColor: darkMode ? '#999' : null,
              }
            : { backgroundColor: darkMode ? primary : '#8aa2ed50' },
          ,
          state.active === 1
            ? {
                backgroundColor: darkMode ? primary : '#8aa2ed',
                elevation: 10,
                borderWidth: darkMode ? 3 : 0,
              }
            : null,
          ,
        ]}
        onPress={() =>
          onPress({
            name: 'Fajr',
            time: prayerTime?.Fajr,
          })
        }
      >
        <View style={styles.wrapView}>
          <Text
            style={[
              styles.txtLabel,
              state.fajr === 'gone'
                ? { color: darkMode ? '#999' : '#444' }
                : { color: darkMode ? txtWhite : '#000' },
            ]}
          >
            Fajr
          </Text>
          <View style={styles.wrapViewRow}>
            <Text
              style={[
                styles.txtLabel,
                state.fajr === 'gone'
                  ? { color: darkMode ? '#999' : '#444' }
                  : { color: darkMode ? txtWhite : '#000' },
              ]}
            >
              {hour12 ? timeAMPM(prayerTime?.Fajr) : prayerTime?.Fajr}
            </Text>

            <MaterialIcons
              name={
                azanNotification?.Fajr?.unsilent
                  ? 'notifications'
                  : azanNotification?.Fajr?.silent
                  ? 'notifications-off'
                  : azanNotification?.Fajr?.azansound
                  ? 'notifications-on'
                  : null
              }
              size={20}
              style={
                state.fajr === 'gone'
                  ? { color: darkMode ? '#999' : '#444' }
                  : { color: darkMode ? txtWhite : '#000' }
              }
            />
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          {
            ...styles.btnMediumWrap,
            borderColor: txtWhite,
          },
          state.sunrise === 'gone'
            ? {
                backgroundColor: darkMode ? primary : '#8aa2ed20',
                borderColor: darkMode ? '#999' : null,
              }
            : { backgroundColor: darkMode ? primary : '#8aa2ed50' },
          ,
          state.active === 2
            ? {
                backgroundColor: darkMode ? primary : '#8aa2ed',
                elevation: 10,
                borderWidth: darkMode ? 3 : 0,
              }
            : null,
        ]}
        onPress={() =>
          onPress({
            name: 'Sunrise',
            time: prayerTime?.Sunrise,
          })
        }
      >
        <View style={styles.wrapView}>
          <Text
            style={[
              styles.txtLabel,
              state.sunrise === 'gone'
                ? { color: darkMode ? '#999' : '#444' }
                : { color: darkMode ? txtWhite : '#000' },
            ]}
          >
            Sunrise
          </Text>
          <View style={styles.wrapViewRow}>
            <Text
              style={[
                styles.txtLabel,
                state.sunrise === 'gone'
                  ? { color: darkMode ? '#999' : '#444' }
                  : { color: darkMode ? txtWhite : '#000' },
              ]}
            >
              {hour12 ? timeAMPM(prayerTime?.Sunrise) : prayerTime?.Sunrise}
            </Text>
            <MaterialIcons
              name={
                azanNotification?.Sunrise?.unsilent
                  ? 'notifications'
                  : azanNotification?.Sunrise?.silent
                  ? 'notifications-off'
                  : azanNotification?.Sunrise?.azansound
                  ? 'notifications-on'
                  : null
              }
              size={20}
              style={
                state.sunrise === 'gone'
                  ? { color: darkMode ? '#999' : '#444' }
                  : { color: darkMode ? txtWhite : '#000' }
              }
            />
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          {
            ...styles.btnMediumWrap,
            borderColor: txtWhite,
          },
          state.dhuhr === 'gone'
            ? {
                backgroundColor: darkMode ? primary : '#8aa2ed20',
                borderColor: darkMode ? '#999' : null,
              }
            : { backgroundColor: darkMode ? primary : '#8aa2ed50' },
          ,
          state.active === 3
            ? {
                backgroundColor: darkMode ? primary : '#8aa2ed',
                elevation: 10,
                borderWidth: darkMode ? 3 : 0,
              }
            : null,
        ]}
        onPress={() =>
          onPress({
            name: 'Dhuhr',
            time: prayerTime?.Dhuhr,
          })
        }
      >
        <View style={styles.wrapView}>
          <Text
            style={[
              styles.txtLabel,
              state.dhuhr === 'gone'
                ? { color: darkMode ? '#999' : '#444' }
                : { color: darkMode ? txtWhite : '#000' },
            ]}
          >
            Dhuhr
          </Text>
          <View style={styles.wrapViewRow}>
            <Text
              style={[
                styles.txtLabel,
                state.dhuhr === 'gone'
                  ? { color: darkMode ? '#999' : '#444' }
                  : { color: darkMode ? txtWhite : '#000' },
              ]}
            >
              {hour12 ? timeAMPM(prayerTime?.Dhuhr) : prayerTime?.Dhuhr}
            </Text>

            <MaterialIcons
              name={
                azanNotification?.Dhuhr?.unsilent
                  ? 'notifications'
                  : azanNotification?.Dhuhr?.silent
                  ? 'notifications-off'
                  : azanNotification?.Dhuhr?.azansound
                  ? 'notifications-on'
                  : null
              }
              size={20}
              style={
                state.dhuhr === 'gone'
                  ? { color: darkMode ? '#999' : '#444' }
                  : { color: darkMode ? txtWhite : '#000' }
              }
            />
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          {
            ...styles.btnMediumWrap,
            borderColor: txtWhite,
          },
          state.asr === 'gone'
            ? {
                backgroundColor: darkMode ? primary : '#8aa2ed20',
                borderColor: darkMode ? '#999' : null,
              }
            : { backgroundColor: darkMode ? primary : '#8aa2ed50' },
          ,
          state.active === 4
            ? {
                backgroundColor: darkMode ? primary : '#8aa2ed',
                elevation: 10,
                borderWidth: darkMode ? 3 : 0,
              }
            : null,
        ]}
        onPress={() =>
          onPress({
            name: 'Asr',
            time: prayerTime?.Asr,
          })
        }
      >
        <View style={styles.wrapView}>
          <Text
            style={[
              styles.txtLabel,
              state.asr === 'gone'
                ? { color: darkMode ? '#999' : '#444' }
                : { color: darkMode ? txtWhite : '#000' },
            ]}
          >
            Asr
          </Text>
          <View style={styles.wrapViewRow}>
            <Text
              style={[
                styles.txtLabel,
                state.asr === 'gone'
                  ? { color: darkMode ? '#999' : '#444' }
                  : { color: darkMode ? txtWhite : '#000' },
              ]}
            >
              {hour12 ? timeAMPM(prayerTime?.Asr) : prayerTime?.Asr}
            </Text>

            <MaterialIcons
              name={
                azanNotification?.Asr?.unsilent
                  ? 'notifications'
                  : azanNotification?.Asr?.silent
                  ? 'notifications-off'
                  : azanNotification?.Asr?.azansound
                  ? 'notifications-on'
                  : null
              }
              size={20}
              style={
                state.asr === 'gone'
                  ? { color: darkMode ? '#999' : '#444' }
                  : { color: darkMode ? txtWhite : '#000' }
              }
            />
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          {
            ...styles.btnMediumWrap,
            borderColor: txtWhite,
            height: hp('6.5%'),
          },
          state.maghrib === 'gone'
            ? {
                backgroundColor: darkMode ? primary : '#8aa2ed20',
                borderColor: darkMode ? '#999' : null,
              }
            : { backgroundColor: darkMode ? primary : '#8aa2ed50' },
          state.active === 5
            ? {
                backgroundColor: darkMode ? primary : '#8aa2ed',
                elevation: 10,
                borderWidth: darkMode ? 3 : 0,
              }
            : null,
        ]}
        onPress={() =>
          onPress({
            name: 'Maghrib',
            time: prayerTime?.Maghrib,
          })
        }
      >
        <View style={styles.wrapView}>
          <Text
            style={[
              styles.txtLabel,
              state.maghrib === 'gone'
                ? { color: darkMode ? '#999' : '#444' }
                : { color: darkMode ? txtWhite : '#000' },
            ]}
          >
            Maghrib
          </Text>
          <View style={styles.wrapViewRow}>
            <Text
              style={[
                styles.txtLabel,
                state.maghrib === 'gone'
                  ? { color: darkMode ? '#999' : '#444' }
                  : { color: darkMode ? txtWhite : '#000' },
              ]}
            >
              {hour12 ? timeAMPM(prayerTime?.Maghrib) : prayerTime?.Maghrib}
            </Text>

            <MaterialIcons
              name={
                azanNotification?.Maghrib?.unsilent
                  ? 'notifications'
                  : azanNotification?.Maghrib?.silent
                  ? 'notifications-off'
                  : azanNotification?.Maghrib?.azansound
                  ? 'notifications-on'
                  : null
              }
              size={20}
              style={
                state.maghrib === 'gone'
                  ? { color: darkMode ? '#999' : '#444' }
                  : { color: darkMode ? txtWhite : '#000' }
              }
            />
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          {
            ...styles.btnMediumWrap,
            borderColor: txtWhite,
          },
          state.isha === 'gone'
            ? {
                backgroundColor: darkMode ? primary : '#8aa2ed20',
                borderColor: darkMode ? '#999' : null,
              }
            : { backgroundColor: darkMode ? primary : '#8aa2ed50' },
          state.active === 6
            ? {
                backgroundColor: darkMode ? primary : '#8aa2ed',
                elevation: 10,
                borderWidth: darkMode ? 3 : 0,
              }
            : null,
        ]}
        onPress={() =>
          onPress({
            name: 'Isha',
            time: prayerTime?.Isha,
          })
        }
      >
        <View style={styles.wrapView}>
          <Text
            style={[
              styles.txtLabel,
              state.isha === 'gone'
                ? { color: darkMode ? '#999' : '#444' }
                : { color: darkMode ? txtWhite : '#000' },
            ]}
          >
            Isha
          </Text>
          <View style={styles.wrapViewRow}>
            <Text
              style={[
                styles.txtLabel,
                state.isha === 'gone'
                  ? { color: darkMode ? '#999' : '#444' }
                  : { color: darkMode ? txtWhite : '#000' },
              ]}
            >
              {hour12 ? timeAMPM(prayerTime?.Isha) : prayerTime?.Isha}
            </Text>

            <MaterialIcons
              name={
                azanNotification?.Isha?.unsilent
                  ? 'notifications'
                  : azanNotification?.Isha?.silent
                  ? 'notifications-off'
                  : azanNotification?.Isha?.azansound
                  ? 'notifications-on'
                  : null
              }
              size={20}
              style={
                state.isha === 'gone'
                  ? { color: darkMode ? '#999' : '#444' }
                  : { color: darkMode ? txtWhite : '#000' }
              }
            />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default PrayerTimingCard;
const useGetstyle = () => {
  const {
    lightGrey,
    txtMedium,
    row,
    spaceBetween,
    btnBackground2,
    wp,
    hp,
    align,
    btnBackground,
    primary,
    lightModeBackground,
  } = useTheme1();
  const { darkMode } = useSelector((states) => states.userReducer);
  const styles = StyleSheet.create({
    txtLabel: {
      color: lightGrey,
      fontSize: txtMedium,
      marginStart: '5%',
      fontWeight: '600',
      paddingEnd: '3%',
    },
    wrapView: {
      flexDirection: row,
      justifyContent: spaceBetween,
    },
    wrapViewRow: {
      flexDirection: row,
    },
    btnWrap: {
      backgroundColor: btnBackground2,
      width: wp('40%'),
      height: hp('6.5%'),
      borderRadius: 10,
      elevation: 5,
      alignItems: align,
      justifyContent: align,
    },
    btnMediumWrap: {
      marginTop: '3.3%',
      width: wp('94%'),
      height: hp('6.5%'),
      borderWidth: darkMode ? 1 : 0,
      borderColor: btnBackground,
      borderRadius: 10,
      backgroundColor: darkMode ? primary : null,
      justifyContent: align,
      alignSelf: align,
    },
    dd: {
      justifyContent: align,
    },
  });
  return {
    styles,
  };
};
