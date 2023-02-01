import React, {useEffect, useState, useCallback} from 'react';
import './Form.css'
import {useTelegram} from "../../Hooks/useTelegram";

const Form = () => {
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [subject, setSubject] = useState('physical');

    const {tg} = useTelegram();

    const onSendData = useCallback(() => {
        const data = {
            country,
            city,
            subject
        }
        tg.sendData(JSON.stringify(data));
    }, [country, city, subject])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    useEffect(() => {
        tg.WebApp.onEvent('mainButtonClicked',onSendData)
    },[])

    useEffect(() => {
        if (!country || !city) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    },[country, city])

    const onChangeCountry = (e) => {
        setCountry(e.target.value)
    };

    const onChangeCity = (e) => {
        setCity(e.target.value)
    };

    const onChangeSubject = (e) => {
        setSubject(e.target.value)
    };

    return (
        <div className={"form"}>
            <h3>Введите ваши данные</h3>
            <input className={'input'}
                   placeholder={"Страна"}
                   type={"text"}
                   value={country}
                   onChange={onChangeCountry}/>
            <input className={'input'}
                   placeholder={"Город"}
                   type={"text"}
                   value={city}
                   onChange={onChangeCity}/>
            <select value={subject} onChange={onChangeSubject} className={'select'}>
                <option value={'physical'}>Физ.лицо</option>
                <option value={'legal'}>Юр.лицо</option>
            </select>
        </div>
    );
};

export default Form;
