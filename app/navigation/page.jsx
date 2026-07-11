import Head from "next/head";

export default function Home(){
    return(
        <>
            <Head>
                <title>Tracking Finance</title>
            </Head>
            <div className="flex">
                <sidebar/>
            <main className="flex-1">
                <DashboardContent/>
            </main>
        </div>
    </>
    );
}