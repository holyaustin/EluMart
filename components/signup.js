import React, { useState } from 'react'
import style from '../styles/Signup.module.css'

export const Signup = ({ signup }) => {
  const [username, setUserName] = useState('')
  const [profile, setProfile] = useState('')
  

  const signUpClicked = () => {
    console.log("Singing Up")
    signup(username, profile)
  }

  // console.log(username, profile)

  return (
    <div className={style.authContainer}>
      <h1 className={style.title}>Sign up to use MusikMart</h1>
      <div className={style.signupForm}>
        <div className={style.inputField}>
          <div className={style.inputTitle}>Username:</div>
          <div className={style.inputContainer}>
            <input
              className={style.input}
              type='text'
              placeholder='user'
              onChange={e => setUserName(e.target.value)}
            />
          </div>
        </div>
        <div className={style.inputField}>
          <div className={style.inputTitle}>Profile Image:</div>
          <div className={style.inputContainer}>
            <input
              className={style.input}
              type='text'
              placeholder='https://avatars.dicebear.com/api/adventurer/username.svg'
              onChange={e => setProfile(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className={style.loginButton} onClick={signUpClicked}>
        Sign up
      </div>
    </div>
  )
}