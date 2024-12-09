const { GetAllComputer, UpdateOnPowerOff } = require('../database/database');
const fetch = require('node-fetch')

const checkShutdownTime = () => {
    let poweroffhours
    GetAllComputer((err, row) => {
        if (row) {
            row.map(async (pc) => {
                poweroffhours = pc.poweroffhour
                if (poweroffhours != "none" && poweroffhours != "None" && poweroffhours != null) {
                    const currentTime = new Date();
                    const currentHours = currentTime.getHours();
                    const currentMinutes = currentTime.getMinutes();
                    const [scheduledHours, scheduledMinutes] = poweroffhours.split(':').map(Number);

                    const isPowerOn = pc.powerstatus
                    if (isPowerOn === 1) {
                        if (currentHours >= scheduledHours && currentMinutes >= scheduledMinutes) {
                            try {
                                const response = await fetch(`http://${pc.ip}:5001/api/shutdown`, {
                                    method: "POST",
                                    headers: {
                                        'Content-Type': 'application/json'
                                    }
                                })
                                if (response.ok) {
                                    UpdateOnPowerOff(pc.id, false)
                                }
                            } catch (err) {
                                console.log(err)
                            }
                        }
                    }
                }
            })
        } else if (err) {
            console.log(err)
        }
    })

};


module.exports = checkShutdownTime