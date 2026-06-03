import { Layout, theme } from "antd";

const { Header, Footer, Content } = Layout;

const Homelayout = ({ children }) => {

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout className="min-h-screen bg-gray-100">

            <Header className="!bg-[#FF735C] flex items-center justify-center px-4 shadow-md">
                <h1 className='text-white text-xl md:text-3xl font-bold text-center tracking-wide'>
                    Expense Tracker App
                </h1>
            </Header>

            <Content
                className="mx-3 md:mx-10 my-6"
                style={{
                    padding: 24,
                    minHeight: 280,
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                }}
            >
                <div className="w-full">
                    {children}
                </div>
            </Content>

            <Footer className="!bg-[#FF735C] flex items-center justify-center py-4 shadow-inner">
                <h1 className='text-white text-sm md:text-lg font-semibold text-center'>
                    Footer
                </h1>
            </Footer>

        </Layout>
    );
}

export default Homelayout;