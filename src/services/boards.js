import axios from 'axios';

export const getBoards = async () => {
    try {
        const response = await axios.get('https://api.legalistas.com.ar/v1/tm/boards');
        return response.data;
    } catch (error) {
        console.error('Error fetching boards:', error);
        return [];
    }
};

export const setBoards = async (boards) => {
    try {
        const response = await axios.post('https://api.legalistas.com.ar/v1/tm/boards', boards);
        return response.data;
    } catch (error) {
        console.error('Error fetching boards:', error);
        return [];
    }
}

export const getTeams = async () => {
    try {
        const response = await axios.get('https://api.legalistas.com.ar/v1/api/teams');
        return response.data;
    } catch (error) {
        console.error('Error fetching teams:', error);
        return [];
    }
}

const mockData = [
    {
        id: 1,
        name: "task Group 1",
        tasks: [
            {
                taskId: 101,
                taskTitle: "task Title 1",
                taskDescription: "Description for task 1",
                createdBy: [
                    {
                        userId: 1,
                        userName: "User One",
                        userEmail: "user1@example.com"
                    }
                ],
                teamScope: [
                    1,
                    2
                ],
                usersScope: [
                    101,
                    102
                ]
            },
            {
                taskId: 102,
                taskTitle: "task Title 2",
                taskDescription: "Description for task 2",
                createdBy: [
                    {
                        userId: 2,
                        userName: "User Two",
                        userEmail: "user2@example.com"
                    }
                ],
                teamScope: [
                    2,
                    3
                ],
                usersScope: [
                    103,
                    104
                ]
            }
        ]
    },
    {
        id: 2,
        name: "task Group 2",
        tasks: [
            {
                taskId: 201,
                taskTitle: "task Title 3",
                taskDescription: "Description for task 3",
                createdBy: [
                    {
                        userId: 3,
                        userName: "User Three",
                        userEmail: "user3@example.com"
                    }
                ],
                teamScope: [
                    3,
                    4
                ],
                usersScope: [
                    105,
                    106
                ]
            },
            {
                taskId: 202,
                taskTitle: "task Title 4",
                taskDescription: "Description for task 4",
                createdBy: [
                    {
                        userId: 4,
                        userName: "User Four",
                        userEmail: "user4@example.com"
                    }
                ],
                teamScope: [
                    4,
                    5
                ],
                usersScope: [
                    107,
                    108
                ]
            }
        ]
    },
    {
        id: 3,
        name: "task Group 3",
        tasks: [
            {
                taskId: 301,
                taskTitle: "task Title 5",
                taskDescription: "Description for task 5",
                createdBy: [
                    {
                        userId: 5,
                        userName: "User Five",
                        userEmail: "user5@example.com"
                    }
                ],
                teamScope: [
                    1,
                    5
                ],
                usersScope: [
                    109,
                    110
                ]
            }
        ]
    },
    {
        id: 4,
        name: "task Group 4",
        tasks: [
            {
                taskId: 401,
                taskTitle: "task Title 6",
                taskDescription: "Description for task 6",
                createdBy: [
                    {
                        userId: 6,
                        userName: "User Six",
                        userEmail: "user6@example.com"
                    }
                ],
                teamScope: [
                    2,
                    4
                ],
                usersScope: [
                    111,
                    112
                ]
            }
        ]
    },
    {
        id: 5,
        name: "task Group 5",
        tasks: [
            {
                taskId: 501,
                taskTitle: "task Title 7",
                taskDescription: "Description for task 7",
                createdBy: [
                    {
                        userId: 7,
                        userName: "User Seven",
                        userEmail: "user7@example.com"
                    }
                ],
                teamScope: [
                    3,
                    5
                ],
                usersScope: [
                    113,
                    114
                ]
            }
        ]
    }
]


export const getTasks = async () => {
    try {

        const response = mockData;

        // const response = await axios.get("https://api.legalistas.com.ar/v1/tasks");
        return response;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

export const createTask = async (task) => {
    try {
        const response = await axios.post("https://api.legalistas.com.ar/v1/tasks", task);
        return response.data;
    } catch (error) {
        console.error("Error creating task:", error);
    }
}

export const createColumn = async (column) => {
    try {
        const response = await axios.post("https://api.legalistas.com.ar/v1/columns", column);
        return response.data;
    } catch (error) {
        console.error("Error creating column:", error);
    }
}