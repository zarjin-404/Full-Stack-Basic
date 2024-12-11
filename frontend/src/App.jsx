import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import axios from 'axios';

const App = () => {
    const [bangla, setBangla] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios
            .get('/api/bangla')
            .then((response) => {
                setBangla(response.data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setError(error.message);
                setIsLoading(false);
            });
    }, []);

    return (
        <div className="min-h-screen py-10 bg-gradient-to-br from-blue-100 to-purple-100">
            <div className="container px-4 mx-auto">
                <h1 className="mb-8 text-3xl font-bold text-center text-purple-800">Bangla Jokes Collection</h1>
                <AnimatePresence>
                    {isLoading ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center justify-center h-screen"
                        >
                            <div className="text-xl text-gray-600 animate-pulse">Loading jokes...</div>
                        </motion.div>
                    ) : error ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center justify-center h-screen bg-red-50"
                        >
                            <div className="text-xl font-semibold text-red-600">{error}</div>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                        >
                            {bangla.map(({ id, joke }) => (
                                <motion.div
                                    key={id}
                                    initial={{ scale: 0.5 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0.5 }}
                                    transition={{ duration: 0.3 }}
                                    className="p-6 transition-shadow duration-300 bg-white border-l-4 border-purple-500 shadow-lg rounded-xl hover:shadow-xl"
                                >
                                    <p className="italic text-gray-800">&quot;{joke}&quot;</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default App;
