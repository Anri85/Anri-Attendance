import React, { useState, useEffect, useRef } from "react";

import useAxiosPrivate from "../../api/useAxiosPrivate";

const Modal = ({ setOpenModal, IDattendance, setResponse, response }) => {
    let stream;
    let video;

    const axiosPrivate = useAxiosPrivate();

    const videoRef = useRef(null);
    const photoRef = useRef(null);

    const [hasPhoto, setHasPhoto] = useState(false);
    const [isBlocked, setIsBlocked] = useState(false);
    const [isStillLoad, setIsStillLoad] = useState(true);

    // fungsi yang digunakan untuk mengakese webcam menggunakan navigator.mediaDevices.getUserMedia
    const getVideo = () => {
        if (isBlocked) return false;
        navigator.mediaDevices
            .getUserMedia({ video: { width: 640, height: 360 } })
            .then((data) => {
                // fungsi navigator akan menghasilkan data kemudian data tersebut dipasang pada tag video lewat videoRef
                stream = data;
                video = videoRef.current;
                video.srcObject = data;
                video.onloadedmetadata = () => {
                    video.play();
                    setIsStillLoad(false);
                };
            })
            // jika terjadi error (akses pada kamera diblokir)
            .catch((error) => {
                setOpenModal(false);
                setIsBlocked(true);
                setResponse({ ...response, message: "Akses kamera diblokir oleh pengguna", status: false, statusCode: 404 });
            });
    };

    // fungsi untuk melakukan close webcam
    const closeVideo = () => {
        // jika terdapat stream yang berasal dari fungsi getVideo
        if (stream) {
            // maka hapus stream tersebut
            stream.getTracks().forEach((track) => {
                track.stop();
            });
            stream = undefined;
        }
        // kemudian tutup kembali modalnya
        setOpenModal(false);
    };

    // fungsi untuk melakukan pengambilan foto
    const takePhoto = () => {
        const width = 640;
        const height = 360;

        // ambil data videoRef dan photoRef
        let video = videoRef.current;
        let photo = photoRef.current;

        // atur ukuran foto
        photo.width = width;
        photo.height = height;

        // draw sebuah elemen canvas berdasarkan dari data videoRef
        let ctx = photo.getContext("2d");
        ctx.drawImage(video, 0, 0, width, height);

        // lakukan pengecekan apakah gambar yang dibuat pada canvas adalah gambar blank hitam
        const imageData = ctx.getImageData(0, 0, photo.offsetWidth, photo.offsetHeight);
        for (let i = 0; i < imageData.data.length; i += 4) {
            // jika gambar yang dibuat dalam canvas bukanlah blank image artinya lanjutkan proses gambar
            if (imageData.data[i + 2] !== 0 && imageData.data[i + 2] > 100) {
                // ubah state hasPhoto menjadi true
                setHasPhoto(true);
                return true;
            }
            // jika gambar yang dibuat dalam canvas adalah blank image artinya webcam tidak aktif
            setIsBlocked(true);
            setOpenModal(false);
            setResponse({ ...response, message: "Pastikan wajah anda terlihat jelas oleh kamera", status: false, statusCode: 404 });
            return false;
        }
    };

    // fungsi untuk melakukan retake photo
    const clearPhoto = () => {
        // ambil elemen canvas yang berisi foto
        let photo = photoRef.current;
        let ctx = photo.getContext("2d");

        // hapus photo dari elemen canvas tersevut
        ctx.clearRect(0, 0, photo.width, photo.height);
        // ubah state hasPhoto menjadi false
        setHasPhoto(false);
    };

    // fungsi untuk memproses foto menjadi base64 sebelum dikirimkan kepada backend
    const createBase64 = async () => {
        // cek apakah terdapat photo dalam elemen canvas
        if (hasPhoto) {
            if (window.confirm("This data is true?") === true) {
                // ambil elemen canvas yang berisi foto
                const element = document.getElementById("photo");
                // ubah foto tersebut menjadi base64
                const base64 = element.toDataURL("image/jpeg", 0.1);
                // kirimkan kepada backend
                if (IDattendance === undefined) {
                    await axiosPrivate.post("/users/upload", { base64: base64, action: "Upload" });
                } else {
                    await axiosPrivate.post(`/attendance/create/${IDattendance}`, { base64: base64, action: IDattendance !== "" ? "Out" : "In" });
                }
                window.location.reload();
            }
        } else {
            return false;
        }
    };

    useEffect(() => {
        getVideo();
    }, [videoRef]);

    return (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-2 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-2 border-b border-solid border-slate-200 rounded-t">
                            <h3 className="text-xl font-semibold">Please take your pic...</h3>
                            <button
                                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                onClick={closeVideo}
                            >
                                <i className="fa fa-window-close bg-dark" aria-hidden="true"></i>
                            </button>
                        </div>
                        {/*body*/}
                        <div className="relative p-2 flex-auto">
                            <div className="camera">
                                <video id="video" ref={videoRef}></video>
                            </div>
                            <div className={"result " + (hasPhoto ? "hasPhoto" : "")}>
                                <canvas id="photo" className="ml-2 mt-2" ref={photoRef}></canvas>
                            </div>
                        </div>
                        {/*footer*/}
                        <div className="flex items-center justify-end p-2 border-t border-solid border-slate-200 rounded-b">
                            {hasPhoto ? (
                                <>
                                    <button
                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-2 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={clearPhoto}
                                        disabled={isBlocked}
                                    >
                                        Retake Photo
                                    </button>
                                    <button
                                        className="bg-blue-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-2 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={createBase64}
                                        disabled={isBlocked}
                                    >
                                        {IDattendance === undefined ? "Upload photo" : "Create Attendance"}
                                    </button>
                                </>
                            ) : (
                                <button
                                    className="bg-red-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-2 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={takePhoto}
                                    disabled={isStillLoad}
                                >
                                    Take Photo
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    );
};

export default Modal;
