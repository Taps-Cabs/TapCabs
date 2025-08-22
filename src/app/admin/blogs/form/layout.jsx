import BlogFormContextProvider from "./contexts/BlogFormContext";

export default function Layout({ children }) {
    return <BlogFormContextProvider>{children}</BlogFormContextProvider>
}