import LocalTripFormContextProvider from './context/localTripContext'

function layout({ children }) {
    return (
        <LocalTripFormContextProvider>
            <div>
                {children}
            </div>
        </LocalTripFormContextProvider>
    )
}

export default layout
