import { createSlice } from '@reduxjs/toolkit'
import { fetchTheRoomData } from './joinedroomSlice';
import { addRoom } from './roomSlice';
const nameData =
    [
        "nar",
        "An",
        "Alfr",
        "Alvi",
        "Ari",
        "Arinbjorn",
        "Arngeir",
        "Arngrim",
        "Arnfinn",
        "Asgeirr",
        "Askell",
        "Asvald",
        "Bard",
        "Baror",
        "Bersi",
        "Borkr",
        "Bjarni",
        "Bjorn",
        "Brand",
        "Brandr",
        "Cairn",
        "Canute",
        "Dar",
        "Einarr",
        "Eirik",
        "Egill",
        "Engli",
        "Eyvindr",
        "Erik",
        "Eyvind",
        "Finnr",
        "Floki",
        "Fromund",
        "Geirmundr",
        "Geirr",
        "Geri",
        "Gisli",
        "Gizzur",
        "Gjafvaldr",
        "Glumr",
        "Gorm",
        "Grmir",
        "Gunnarr",
        "Guomundr",
        "Hak",
        "Halbjorn",
        "Halfdan",
        "Hallvard",
        "Hamal",
        "Hamundr",
        "Harald",
        "Harek",
        "Hedinn",
        "Helgi",
        "Henrik",
        "Herbjorn",
        "Herjolfr",
        "Hildir",
        "Hogni",
        "Hrani",
        "Ivarr",
        "Hrolf",
        "Jimmy",
        "Jon",
        "Jorund",
        "Kalf",
        "Ketil",
        "Kheldar",
        "Klaengr",
        "Knut",
        "Kolbeinn",
        "Kolli",
        "Kollr",
        "Lambi",
        "Magnus",
        "Moldof",
        "Mursi",
        "Njall",
        "Oddr",
        "Olaf",
        "Orlyg",
        "Ormr",
        "Ornolf",
        "Osvald",
        "Ozurr",
        "Poror",
        "Prondir",
        "Ragi",
        "Ragnvald",
        "Refr",
        "Runolf",
        "Saemund",
        "Siegfried",
        "Sigmundr",
        "Sigurd",
        "Sigvat",
        "Skeggi",
        "Skomlr",
        "Slode",
        "Snorri",
        "Sokkolf",
        "Solvi",
        "Surt",
        "Sven",
        "Thangbrand",
        "Thjodoft",
        "Thorod",
        "Thorgest",
        "Thorvald",
        "Thrain",
        "Throst",
        "Torfi",
        "Torix",
        "Tryfing",
        "Ulf",
        "Valgaror",
        "Vali",
        "Vifil",
        "Vigfus",
        "Vika",
        "Waltheof"
    ]
export const STATUSES = Object.freeze({
    IDLE: "idle",
    ERROR: "error",
    LOADING: "loading",
});

export const createRoomSlice = createSlice({
    name: 'createRoom',
    initialState: {
        data: {},
        roomname: ''
    },
    reducers: {
        createRoomdata: (state, action) => {
            state.data = action.payload
        },
        createRoomName: (state, action) => {
            const index = getRandomInt(0, nameData.length);
            state.roomname = nameData[index];

        }, setStatus(state, action) {
            state.status = action.payload;
        },
    },
})

// Action creators are generated for each case reducer function
export const { createRoomdata, setStatus, createRoomName } = createRoomSlice.actions

export default createRoomSlice.reducer

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function createroom() {
    return async function createroomThunk(dispatch, getState) {
        dispatch(setStatus(STATUSES.LOADING));
        try {
            const room = getState().createRoom;
            var newroom = room.data
            var newData = {};
            if (newroom.topic === "Select" && newroom.company === "Select") {
                newData = {
                    name: room.roomname,
                    userid: newroom.userid
                }
            } else if (newroom.topic === "Select") {
                newData = {
                    name: room.roomname,
                    userid: newroom.userid,
                    company: newroom.company
                }
            } else if (newroom.company === "Select") {
                newData = {
                    name: room.roomname,
                    userid: newroom.userid,
                    topic: newroom.topic
                }
            } else {
                newData = {
                    name: room.roomname,
                    userid: newroom.userid,
                    topic: newroom.topic,
                    company: newroom.company
                }
            }
            console.log(newData);
            dispatch(addRoom({ roomname: newData.name }));

            const res = await fetch(
                `/room/create`,
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Credentials": true,
                    },
                    body: JSON.stringify(newData),
                }
            );
            const data = await res.json();
            dispatch(setStatus(STATUSES.IDLE));
        } catch (err) {
            console.log(err);
            dispatch(setStatus(STATUSES.ERROR));
        }
    };
}
