import { StylesProvider } from '@chakra-ui/react';
import React from 'react';
import { useEffect, useState } from 'react';
import styles from '../../styles/reservation.module.css';

export default class Timer extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      minutes: 15,
      seconds: 0
    }
  }

  componentDidMount() {
    this.myInterval = setInterval(() => {
      const { seconds, minutes } = this.state;

      if (seconds > 0) {
        this.setState(({ seconds }) => ({
          seconds: seconds - 1
        }))
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(this.myInterval)
        } else {
          this.setState(({ minutes }) => ({
            minutes: minutes - 1,
            seconds: 59
          }))
        }
      }
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.myInterval)
  }

  render () {
    return (
      <div >
        {this.state.minutes === 0 && this.state.seconds === 0
                    ? <h1 className={styles.timer}>Time's up!</h1>
                    :
        <h1 className={styles.timer}>Time Remaining: {this.state.minutes}:{this.state.seconds < 10 ? `0${this.state.seconds}` : this.state.seconds }</h1>}
      </div>
    )
  }
}