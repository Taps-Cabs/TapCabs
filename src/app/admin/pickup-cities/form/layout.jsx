import PickupCityFormContexttProvider from './context/PickupCityContext'

function layout({ children }) {
    return (
        <PickupCityFormContexttProvider>
            <div>
                {children}
            </div>
        </PickupCityFormContexttProvider>
    )
}

export default layout
