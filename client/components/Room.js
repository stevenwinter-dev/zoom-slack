import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Peer from 'simple-peer'
import videoChannelStyles from '../styles/VideoChannel.module.css'

    const Video = (props) => {
        const ref = useRef();
    
        useEffect(() => {
            props.peer.on("stream", stream => {
                ref.current.srcObject = stream;
            })
        }, []);
    
        return (
            <video playsInline autoPlay ref={ref} className={videoChannelStyles['video-channel-video']} />
        );
    }

    const videoConstraints = {
        width: {
            min: 320,
             max: 320
         },
         height: {
            min: 240,
             max: 240
         }
    };

    const Room = (props) => {
        const [peers, setPeers] = useState([]);
        const socketRef = useRef();
        const userVideo = useRef();
        const peersRef = useRef([]);
        const roomID = props.channel;
    
        useEffect(() => {
            // socketRef.current = io.connect("http://localhost:3001");
            socketRef.current = io.connect("https://zoom-slack.herokuapp.com/");
            navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: true }).then(stream => {
                userVideo.current.srcObject = stream;
                socketRef.current.emit("join room", roomID);
                socketRef.current.on("all users", users => {
                    const peers = [];
                    users.forEach(userID => {
                        const peer = createPeer(userID, socketRef.current.id, stream);
                        peersRef.current.push({
                            peerID: userID,
                            peer,
                        })
                        peers.push(peer);
                    })
                    setPeers(peers);
                })
    
                socketRef.current.on("user joined", payload => {
                    const peer = addPeer(payload.signal, payload.callerID, stream);
                    peersRef.current.push({
                        peerID: payload.callerID,
                        peer,
                    })
    
                    setPeers(users => [...users, peer]);
                });
    
                socketRef.current.on("receiving returned signal", payload => {
                    const item = peersRef.current.find(p => p.peerID === payload.id);
                    item.peer.signal(payload.signal);
                });
            })
        }, []);
    
        function createPeer(userToSignal, callerID, stream) {
            const peer = new Peer({
                initiator: true,
                trickle: false,
                stream,
            });
    
            peer.on("signal", signal => {
                socketRef.current.emit("sending signal", { userToSignal, callerID, signal })
            })
    
            return peer;
        }
    
        function addPeer(incomingSignal, callerID, stream) {
            const peer = new Peer({
                initiator: false,
                trickle: false,
                stream,
            })
    
            peer.on("signal", signal => {
                socketRef.current.emit("returning signal", { signal, callerID })
            })
    
            peer.signal(incomingSignal);
    
            return peer;
        }
    
        return (
            <div className={videoChannelStyles['video-channel-container']}>
                <video muted ref={userVideo} autoPlay playsInline className={videoChannelStyles['video-channel-video']} />
                {peers.map((peer, index) => {
                    return (
                        <Video key={index} peer={peer} />
                    );
                })}
            </div>
        );
    };

export default Room
