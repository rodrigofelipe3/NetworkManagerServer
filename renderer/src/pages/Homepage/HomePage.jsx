import React, { useEffect, useState } from "react";
import { ContainerJSX } from "../../components/Container";
import { GetData } from "../../services/server/getData";
import { getComputerById } from "../../services/server/GetComputerById";
import { LoadingComponent } from "../../components/IsLoading";
import swal from "sweetalert"
import { InformationScreen } from "../../components/screens/ViewInformation";
import { ComputerListScreen } from "../../components/screens/ListCompScreen";
import { CompHeader } from "../../components/Header";
import { CmdKey } from "../../services/cliente/Command";


export const HomePage = () => {
    const [viewInformation, setViewInformation] = useState(false)
    const [adressIp, setAdressip] = useState()
    const [macAdress, setMacAdress] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [InputValue, setInputValue] = useState("")
    const [InputValue2, setInputValue2] = useState("")
    const [connectionErr, setConnectionErr] = useState(null)
    const [selectedKey, setSelectedKey] = useState("")
    const [recharge, setRecharge] = useState(false)
    const [data, setData] = useState([{
        id: "",
        host: "",
        processor: "",
        memory: "",
        hard_disk: "",
        operating_system: "",
        arch: "",
        release: "",
        monitors: "",
        ip: "",
        mac_address: "",
        status: "",
        network_devices: [""],
        poweroff: '',
        poweroffhour: ""
    },
    ])
    const [dataById, setDataById] = useState([{
        id: "",
        host: "",
        processor: "",
        memory: "",
        hard_disk: "",
        operating_system: "",
        arch: "",
        release: "",
        monitors: "",
        ip: "",
        mac_address: "",
        status: "",
        network_devices: [""],
        poweroff: '',
        poweroffhour: ""
    },
    ])

    const handleGetData = async () => {
        const response = await GetData()
        if (response.error) {
            swal({
                title: "Oops..",
                text: "Error " + response.error,
                icon: "error",
                timer: 2000
            })

        } else {
            setData(response)
        }
    }
    
    
    const handleClick = async (pcs, ip, mac) => {

        const keyValue = pcs ? pcs : "1";
        setAdressip(ip)
        setMacAdress(mac)   
        setSelectedKey(keyValue);
        setViewInformation(true);
        const options = {
            type: "information",
        }
        const response = await CmdKey(adressIp, options)
        console.log(response)
        if (response?.ok == false) { 
            setConnectionErr(true)
        }
    };

    const filteredComputers = data.filter(computer =>
        computer.host.toLowerCase().includes(InputValue.toLowerCase() || InputValue2.toLowerCase()) ||
        computer.status.toLowerCase().includes(InputValue.toLowerCase() || InputValue2.toLowerCase()) ||
        computer.poweroff === Number(InputValue) || Number(InputValue2)
    );

    useEffect(() => {
        setIsLoading(true)
        try {
             if (viewInformation === false) {
                handleGetData()
                
            }

        } catch (err) {

        } finally {
            setIsLoading(false)
            setRecharge(false)
        }

    }, [viewInformation, recharge])
    return (
        <>
            <ContainerJSX>
            {isLoading && <LoadingComponent />}
                <CompHeader
                    setInputValue={setInputValue}
                    InputValue={InputValue}
                    recharge={setRecharge}
                />
                {!viewInformation && (
                    <ComputerListScreen
                        data={data}
                        setInputValue={setInputValue2}
                        filter={filteredComputers}
                        handleClick={handleClick}
                        recharge={setRecharge}
                    />
                )}
                { viewInformation && (
                  <InformationScreen
                    selectedKey ={selectedKey}
                    data={dataById}
                    ipAdress={adressIp}
                    macAdress={macAdress}
                    viewInformation={setViewInformation}
                    />
                )}
            </ContainerJSX>
        </>
    )
}