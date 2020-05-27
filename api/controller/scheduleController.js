const mongoose = require('mongoose');
const Schedule = mongoose.model('Schedule');
// const nodemailer = require('nodemailer')
var jwt = require('jsonwebtoken');
const getschedule = async function (data) {



    let schedule = await Schedule.findOne({ soHieu: data.student.soHieu });
    let TKB

    if (schedule.ngayKetThuc <= schedule.ngayKetThuc) {
        return schedule
    } else {
        return {
            mess: "Chưa có thời khóa biểu trong thời gian này"
        }
    }



}

const getschedulebyclass = async function (data) {



    let schedule = await Schedule.findOne({ soHieu: data.soHieu });
    let TKB

    return schedule



}
const updateSchedule = async function (data) {



    let TKB = await Schedule.findOne({ soHieu: data.soHieu });
    if (TKB) {
        TKB.remove()

    }
    let schedule = new Schedule(data)
    let thuhai = [];
    let thuba = [];
    let thutu = [];
    let thunam = [];
    let thusau = [];
    let thubay = []
    for (let i = 0; i <= 4; i++) {
        if (data.thuhai.listmonhoc[i].mon && data.thuhai.listmonhoc[i].mon != '') {
            thuhai.push(data.thuhai.listmonhoc[i])
        }
        if (data.thuba.listmonhoc[i].mon && data.thuba.listmonhoc[i].mon != '') {
            thuba.push(data.thuba.listmonhoc[i])
        }
        if (data.thutu.listmonhoc[i].mon && data.thutu.listmonhoc[i].mon != '') {
            thutu.push(data.thutu.listmonhoc[i])
        }
        if (data.thunam.listmonhoc[i].mon && data.thunam.listmonhoc[i].mon != '') {
            thunam.push(data.thunam.listmonhoc[i])
        }
        if (data.thusau.listmonhoc[i].mon && data.thusau.listmonhoc[i].mon != '') {
            thusau.push(data.thusau.listmonhoc[i])
        }
        if (data.thubay.listmonhoc[i].mon && data.thubay.listmonhoc[i].mon != '') {
            thubay.push(data.thubay.listmonhoc[i])
        }
    }
    schedule.thuhai.listmonhoc = thuhai
    schedule.thuba.listmonhoc = thuba
    schedule.thutu.listmonhoc = thutu
    schedule.thunam.listmonhoc = thunam
    schedule.thusau.listmonhoc = thusau
    schedule.thubay.listmonhoc = thubay
    await schedule.save()
    return schedule



}
const createSchedule = async function (data) {



    let schedule = await Schedule.findOne({ soHieu: data.soHieu.soHieu });
    if (schedule) {
        schedule.thuhai.listmonhoc = data.listmonhoc
        schedule.thuba.listmonhoc = data.listmonhoc
        schedule.thutu.listmonhoc = data.listmonhoc
        schedule.thunam.listmonhoc = data.listmonhoc
        schedule.thusau.listmonhoc = data.listmonhoc
        schedule.thubay.listmonhoc = data.listmonhoc
        await schedule.save()
        return schedule

    }





}
const getCurrentSchedule = async function (soHieu, date) {



    let TKB = await Schedule.findOne({ soHieu: soHieu })
    
    switch (date) {
        case 1:
           { return TKB.thuhai}
           
        case 2:

            { return TKB.thuba}
        case 3:

            { return TKB.thutu}
        case 4:

            { return TKB.thunam}
        case 5:

            { return TKB.thusau}
        case 6:

            { return TKB.thubay}
        default:
            break;
    }
 





}
module.exports = {
    getschedule: getschedule,
    getschedulebyclass: getschedulebyclass,
    updateSchedule: updateSchedule,
    createSchedule: createSchedule,
    getCurrentSchedule: getCurrentSchedule
}