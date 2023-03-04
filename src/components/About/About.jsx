import { useState, useEffect } from 'react'
import style from './About.module.css'

export default function About ({loading}) {
  const [ image, setImage ] = useState('')
  const [ sending, setSending ] = useState(false)
  const [ messageDialog, setMessageDialog ] = useState('Please, complete the fields')
  const [ form, setForm ] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [ loader, setLoader ] = useState(
    <img src={loading} alt='loader' width={96} style={{margin: '5rem 0', padding: '1.3rem 5rem'}}/>
  )

  const getPhoto = async () => {
    const photo = await fetch('https://tinyurl.com/2jdqjogd')
    photo.status !== 200
    ? setImage('https://tinyurl.com/2p7c4u4g')
    : setImage(photo.url)
  }

  const handlerCheckName = event => {
    setForm({
      ...form,
      name: event.target.value
    })

    if(!event.target.value.length) document.getElementById('name').classList.add(style['show-warning'])
    else document.getElementById('name').classList?.remove(style['show-warning'])
  }

  const handlerCheckEmail = event => {
    setForm({
      ...form,
      email: event.target.value
    })

    if(!event.target.value.length) document.getElementById('email').classList.add(style['show-warning'])
    else document.getElementById('email').classList?.remove(style['show-warning'])
    if(!event.target.value.includes('@') && (!event.target.value.includes('.com') || !event.target.value.includes('.es'))) document.getElementById('emailCheck').classList.add(style['show-warning'])
    else document.getElementById('emailCheck').classList?.remove(style['show-warning'])
  }

  const handlerCheckMessage = event => {
    setForm({
      ...form,
      message: event.target.value
    })

    if(!event.target.value.length) document.getElementById('message').classList.add(style['show-warning'])
    else document.getElementById('message').classList?.remove(style['show-warning'])
  }

  const handlerEmailSend = event => {
    event.preventDefault()
    if(!form.name.length || !form.email.length || !form.message.length){
      handlerShowModal()
    }
    else {
      setSending(true)
      fetch("https://formsubmit.co/ajax/nicosanchez675@gmail.com", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(form)
      })
        .then(res => res.json())
        .then(() => {
          setMessageDialog('Thank you for the message!')
          handlerShowModal()
          setForm({
            name: '',
            email: '',
            message: ''
          })
        })
        .catch(error => console.log(error));
    }
  }

  const handlerPCEmail = event => {
    event.preventDefault()
    window.location.href = 'mailto:nicosanchez675@gmail.com'
  }

  const handlerShowModal = () => {
    document.getElementById('failEmail').showModal()
    document.getElementById('failEmail').classList.add(`${style['showModal']}`)
  }

  const handlerExitModal = () => {
    document.getElementById('failEmail').close()
    setMessageDialog('Please, complete the fields')
    setSending(false)
    document.getElementById('failEmail').classList.remove(`${style['showModal']}`)
  }
  
  useEffect(() => {
    window.scroll(0, 0)
    getPhoto()
  },[])

  useEffect(() => {
    setTimeout(() => {
      setLoader(
        <h2 style={{margin: '5rem 2rem', textAlign: 'center'}}>Something went wrong 😵‍💫</h2>
      )
    }, 5000)
  }, [loader])

  return(
    <div className={style['container']}>
      <div className={style['info-container']}>
        <h1>About Me:</h1>
        {
          !image.length
          ? loader
          : <img src={image} alt='profile-pic'/>
        }
        <p>Hi! I'm Nico Sanchez</p>
        <p>I hope you enjoyed the app</p>
        <br />
        <p>If you want to talk, I'm here!</p>
      </div>
      <form className={style['form-container']}>
        <input type="text" name="name" placeholder="Name" value={form.name} onChange={handlerCheckName}/>
        <p id='name' className={style['warning']}>* This field can't be empty *</p>
        <input type="text" name="email" placeholder="Email" value={form.email} onChange={handlerCheckEmail}/>
        <p id='email' className={style['warning']}>* This field can't be empty *</p>
        <p id='emailCheck' className={style['warning']}>* Enter a valid email *</p>
        <input type="text" name="message" placeholder="Message" value={form.message} onChange={handlerCheckMessage}/>
        <p id='message' className={style['warning']}>* This field can't be empty *</p>
        <button onClick={handlerEmailSend} disabled={sending}>{ sending ? 'Sending...' : 'Send'}</button>
      </form>
      <dialog id='failEmail'>
        <div className={style['warning-fields']}>
          <h2>{messageDialog}</h2>
          <button
            id='exitModal'
            onClick={() => handlerExitModal()}
            >Back
          </button>
        </div>
      </dialog>
      <p>Or</p>
      <button onClick={handlerPCEmail}>Send from your email app</button>
    </div>
  )
}