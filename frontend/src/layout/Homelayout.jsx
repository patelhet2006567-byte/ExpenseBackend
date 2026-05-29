import { Layout, theme } from "antd";

const { Header, Footer, Content } = Layout;

const Homelayout = ({ children }) => {

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout className="min-h-screen bg-gray-100">

            {/* Header */}
            <Header className="!bg-[#FF735C] flex items-center justify-center shadow-md px-4">
                <h1 className="text-white text-xl md:text-3xl font-bold tracking-wide text-center">
                    Expense Tracker App
                </h1>
            </Header>

            {/* Content */}
            <Content
                className="mx-3 md:mx-10 my-6 transition-all duration-300"
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

            {/* Footer */}
            <Footer className="!bg-[#FF735C] flex items-center justify-center py-4 shadow-inner">
                <h1 className="text-white text-sm md:text-lg font-semibold text-center">
                    © 2026 Expense Tracker App
                </h1>
            </Footer>

        </Layout>
    );
};

export default Homelayout;