import React from "react";

import CardAddUser from "../../components/Cards/CardAddUser";

const CreateUser = () => {
    return (
        <>
            <div className="flex flex-wrap mt-4">
                <div className="w-full mb-12 px-4">
                    <CardAddUser />
                </div>
            </div>
        </>
    );
};

export default CreateUser;
