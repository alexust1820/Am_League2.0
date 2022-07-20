import React, { createContext } from "react";
export const PositionContext = createContext(null)

export const PositionProvider = ({children}) => {

    return(
        <PositionContext.Provider value={[
            'Не определен',
            'Вратать',
            'Защитник',
            'Полузащитник',
            'Нападающий'
        ]}>
            {children}
        </PositionContext.Provider>
    )
}