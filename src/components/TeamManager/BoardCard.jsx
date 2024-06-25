import React from 'react'
import { BsKanban, BsThreeDots } from "react-icons/bs";
import { Tooltip } from "@nextui-org/react";
import Link from 'next/link';

function BoardCard({ board, key }) {
    return (
        <Link href={`/tm/board/${board.id}`}
            key={key}
            className="border-gray-600 bg-gray-800 hover:bg-gray-500 group relative flex h-16 cursor-pointer items-center justify-between rounded-[8px] transition duration-300 hover:bg-black/10"
        >
            <div className="flex items-center">
                <div className="ml-2 mr-2 flex h-12 w-12 items-center justify-center rounded-[8px] bg-primary text-white">
                    <BsKanban className="h-6 w-6" />
                </div>
                <span className="font-semibold">{board.name}</span>
            </div>
            <Tooltip content="More options">
                <BsThreeDots
                    className="ml-auto mr-4 hidden cursor-pointer hover:bg-black group-hover:block"
                    size={18}
                />
            </Tooltip>
        </Link>
    )
}

export default BoardCard