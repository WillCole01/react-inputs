export const appState = {
    Calcs: {
        inputs: [{
                id: 1,
                inputText: "",
                isActive: false
            }
        ],
        origin: -1,
        lastActive: -1
    },
    FilterGroups: {},
    QuestionMapper: {}
};

export default appState;
// export const getAppState = (section) =>  {return appState[section]};
