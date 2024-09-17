import React, { useEffect, useState } from "react";
import { ContainerJSX } from "../../components/Container";
import { GridContent, HeaderContent, InformationContent, StyledButton } from "./style";
import { ComputerCard } from "../../components/ComputerCard";
import { GetData } from "../../services/getData";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { Table } from "../../components/Table";


const Tabledata = [{
  system: {
      cpuUsage: "35.60",
      memoryUsage: "58.34"
  },
  processes: [
      {
          name: "chrome.exe",
          cpu: "12.30",
          memory: "500.23",
          pid: 1234
      },
      {
          name: "node.exe",
          cpu: "9.45",
          memory: "102.56",
          pid: 5678
      },
      {
          name: "explorer.exe",
          cpu: "7.80",
          memory: "230.15",
          pid: 9101
      },
      {
          name: "cmd.exe",
          cpu: "4.32",
          memory: "45.67",
          pid: 1121
      },
      {
          name: "MsMpEng.exe",
          cpu: "3.45",
          memory: "300.12",
          pid: 1415
      },
      {
          name: "svchost.exe",
          cpu: "2.65",
          memory: "400.45",
          pid: 1617
      },
      {
          name: "discord.exe",
          cpu: "2.10",
          memory: "100.50",
          pid: 1819
      },
      {
          name: "Teams.exe",
          cpu: "1.80",
          memory: "210.70",
          pid: 2021
      },
      {
          name: "System Idle Process",
          cpu: "1.50",
          memory: "0.00",
          pid: 0
      },
      {
          name: "Spotify.exe",
          cpu: "1.20",
          memory: "120.50",
          pid: 2223
      },
      {
          name: "firefox.exe",
          cpu: "0.90",
          memory: "130.65",
          pid: 2425
      },
      {
          name: "vscode.exe",
          cpu: "0.85",
          memory: "250.30",
          pid: 2627
      },
      {
          name: "OneDrive.exe",
          cpu: "0.75",
          memory: "200.12",
          pid: 2829
      },
      {
          name: "Outlook.exe",
          cpu: "0.65",
          memory: "150.45",
          pid: 3031
      },
      {
          name: "Skype.exe",
          cpu: "0.55",
          memory: "80.20",
          pid: 3233
      }
  ]
}]

export const HomePage = () => {
    const [viewInformation, setViewInformation] = useState(false)
    const [selectedKey, setSelectedKey] = useState("")
    const [data, setData] = useState([{ 
        id: "",
        host: "",
        processor: "",
        memory: "",
        operating_system: "",
        arch: "",
        release: "",
        ip: "", 
        mac_address: "", 
        status: "" ,
    }, 
    ])

    const handleGetData = async () => {
        const response = await GetData()
        if(response){ 
            setData(response)
        }else { 

        }
       
    }
    useEffect(() => {
        try {
            handleGetData()
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: err,
                footer: '<a href="#">Why do I have this issue?</a>'
            });
        }

    }, [])

    const handleClick = (pcs) => {
  
      const keyValue = pcs.id ? pcs.id : "1";
      setSelectedKey(keyValue);
      setViewInformation(true);
    };

    return (
        <>
            <ContainerJSX>
                <HeaderContent>
                    <h1>Computadores Conectados</h1>
                </HeaderContent>
                {!viewInformation && (
                    <GridContent>
                        {data.map((pcs) =>
                            <ComputerCard key={pcs.id? pcs.id : "1"} onClick={handleClick}
                                id={pcs.id? pcs.id : "1 "}
                                host={pcs.host? pcs.host : "1 "}
                                ip={pcs.ip? pcs.ip : " 1"}
                                mac_address={pcs.mac_address? pcs.mac_address : " 1"}
                                status={pcs.status? pcs.status : "1 "}

                            />
                        )}
                    </GridContent>
                )}
                {viewInformation && (
                    <InformationContent>
                        <div id="button-div" style={{ width: "100%" }}>
                            <StyledButton onClick={() => setViewInformation(false)}>
                                VOLTAR
                            </StyledButton>
                        </div>
                        
                        <div id={"grid-display"}>
                          <div id="SystemInformation">
                            <h1>System Information</h1>
                            {data.map((information)=> 
                              <Table
                              isTaskManager={false}
                              headers={["Information", "Type"]}
                              data={data}
                              isSystemInfo={true}
                              information={information}
                               />
                            )}
                          </div>
                          <div id="ManagerTask">
                            <Table 
                              isTaskManager={true}
                              headers={["Nome", "CPU", "Memory", "PID"]}
                              data={Tabledata}
                            />
                          </div>
                            
                        </div>
                        
                    </InformationContent>
                )}
            </ContainerJSX>
        </>
    )
}