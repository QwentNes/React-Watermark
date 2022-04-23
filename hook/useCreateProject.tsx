import React from 'react';
import toast from "react-hot-toast";
import {useStores} from "./useStores";


export function useCreateProject() {
    const {playground} = useStores()
    const [file, setFile] = React.useState<FormData | null>(null);
    const [name, setName] = React.useState<string>("");

    const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        let validString = e.target.value.replace(/ /g, '_').replace(/[^A-ZА-Яa-zа-я0-9_]+/g, '')
        setName(validString);
    }

    const createProject = (e: React.MouseEvent<HTMLInputElement>) => {
        e.preventDefault()
        if(name.length > 6){
            if (file?.entries() != undefined) {
                let SendingData = file;
                SendingData.append('Project_name', name)
                playground.send(SendingData)
            }
            else{
                toast.error('Загрузите изображение (*.png, *.jpg)')
            }
        }
        else{
            toast.error('В названии используйте более 6 символов')
        }
    }

    const events = {
        'onChangeName': (e: React.ChangeEvent<HTMLInputElement>) => changeName(e),
        'onClickCreate': (e: React.MouseEvent<HTMLInputElement>) => createProject(e),
        'onChangeFile' : (value: FormData) => setFile(value)
    }

    return {events, name}
}