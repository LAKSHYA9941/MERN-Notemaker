import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Notecard from "../../components/cards/Notecard";
import { MdAdd } from "react-icons/md";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInst";
import AddEditNotes from "./addeditnotes";
import Toast from "../../components/toastmessage/Toastmessage";
import EmptyCard from "../../components/emptycard/EmptyCard";
import ADDNOTES from "../../assets/createnotes.svg";
import NOTFOUND from "../../assets/not-found.png";
import { AnimatePresence, motion } from "framer-motion";

const Home = ({ darkMode, toggleDarkMode }) => {
    const [Issearch, setIsSearch] = useState(false);
    const [toastMessage, setToastMessage] = useState({ isShown: false, message: "", data: null });
    const [allNotes, setAllNotes] = useState([]);
    const [OpenEditmodal, setOpenEditmodal] = useState({ isShown: false, type: "add", data: null });
    const [userInfo, setUserInfo] = useState(null);
    const navigate = useNavigate();

    const handleCloseToast = () => setToastMessage({ isShown: false, message: "" });

    const showToastMessage = (message, type) => {
        setToastMessage({ isShown: true, message, type });
    };

    const handleEdit = (noteDetails) => {
        setOpenEditmodal({ isShown: true, data: noteDetails, type: "edit" });
    };

    const getUserInfo = async () => {
        try {
            const response = await axiosInstance.get("/get-user");
            if (response.data?.user) setUserInfo(response.data.user);
        } catch (error) {
            if (error.response?.status === 401) {
                localStorage.clear();
                navigate("/login");
            }
        }
    };

    const getAllNotes = async () => {
        try {
            const response = await axiosInstance.get("/getall-notes");
            if (response.data?.notes) setAllNotes(response.data.notes);
        } catch (error) {
            console.log("An error occurred. Try again.");
        }
    };

    const deleteNote = async (data) => {
        const noteId = data._id;
        try {
            const response = await axiosInstance.delete("/delete-note/" + noteId);
            if (response.data && !response.data.error) {
                showToastMessage("DELETED!", "delete");
                getAllNotes();
            }
        } catch (error) {
            console.log("Error deleting note.");
        }
    };

    const onSearchNote = async (query) => {
        try {
            const response = await axiosInstance.get("/search-notes", { params: { query } });
            if (response.data?.notes) {
                setIsSearch(true);
                setAllNotes(response.data.notes);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const updateIsPinned = async (noteData) => {
        const noteId = noteData._id;
        try {
            const response = await axiosInstance.put("/update-note-pinned/" + noteId, { isPinned: !noteData.isPinned });
            if (response.data?.note) {
                showToastMessage("Note pinned", "pin");
                getAllNotes();
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllNotes();
        getUserInfo();
    }, []);

    const sortedNotes = [...allNotes].sort((a, b) => (b.isPinned === a.isPinned ? 0 : b.isPinned ? 1 : -1));

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-highlight to-amber-200  dark:from-black dark:via-zinc-950 dark:to-yellow-950 transition-colors duration-300">
            <Navbar userInfo={userInfo} onSearchNote={onSearchNote} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            <div className="container mx-auto px-4 py-8">
                {sortedNotes.length > 0 ? (
                    <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                        <AnimatePresence>
                            {sortedNotes.map((item) => (
                                <motion.div
                                    key={item._id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Notecard
                                        title={item.title}
                                        tags={item.tags}
                                        date={item.createdOn}
                                        content={item.content}
                                        isPinned={item.isPinned}
                                        onDelete={() => deleteNote(item)}
                                        onEdit={() => handleEdit(item)}
                                        onPinNote={() => updateIsPinned(item)}
                                        className="bg-white dark:bg-night-glass text-slate-900 dark:text-night-ice shadow-lg dark:shadow-glow-white border border-accent dark:border-night-purple"
                                    />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                ) : (
                    <EmptyCard
                        imgsource={Issearch ? NOTFOUND : ADDNOTES }
                        message={Issearch ? `Oops!! none matches your search` : `WHY IS THIS EMPTY 😠 , FILL IT UP !!!`}
                        className="text-slate-900 dark:text-night-ice"
                    />
                )}
            </div>

            <button
                className="w-14 h-14 flex items-center justify-center fixed right-10 bottom-10 bg-accent dark:bg-night-purple rounded-full hover:shadow-xl hover:scale-110 transition-all duration-500 ease-in-out shadow-black dark:shadow-glow-white"
                onClick={() => setOpenEditmodal({ isShown: true, type: "add", data: null })}
            >
                <MdAdd className="text-[32px] text-white" />
            </button>

            <Modal
                isOpen={OpenEditmodal.isShown}
                onRequestClose={() => setOpenEditmodal({ isShown: false, type: "add", data: null })}
                style={{ overlay: { background: "rgba(0,0,0,0.2)" } }}
                className="w-[90%] md:w-[50%] lg:w-[40%] max-h-[80vh] bg-white dark:bg-night-glass rounded-md mx-auto mt-14 p-5 overflow-y-auto text-slate-900 dark:text-night-ice shadow-black dark:shadow-glow-white"
            >
                <AddEditNotes
                    type={OpenEditmodal.type}
                    noteData={OpenEditmodal.data}
                    onClose={() => setOpenEditmodal({ isShown: false, type: "add", data: null })}
                    getAllNotes={getAllNotes}
                    showToastMessage={showToastMessage}
                />
            </Modal>

            <Toast
                isShown={toastMessage.isShown}
                message={toastMessage.message}
                type={toastMessage.type}
                onClose={handleCloseToast}
            />
        </div>
    );
};

export default Home;
