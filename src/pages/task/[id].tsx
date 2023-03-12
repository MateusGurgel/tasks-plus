import { db } from "@/services/firebaseConnection";
import { async } from "@firebase/util";
import { doc, getDoc } from "firebase/firestore";
import { GetServerSideProps } from "next";
import Head from "next/head";


export default function Task(){
    return(
        <div>
        <Head>
            <title>Task details</title>
        </Head>

        <main>
            <h1>Tasks</h1>
        </main>
    </div>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const id = params?.id as string;

    const docRef = doc(db, "task", id)

    const snapshot = await getDoc(docRef)

    if (snapshot.data() === undefined){

        return{
            redirect:{
                destination: "/",
                permanent: false
            }
        }
    }

    if(!snapshot.data()?.public){
        return{
            redirect:{
                destination: "/",
                permanent: false
            }
        }
    }

    const milliseconds = snapshot.data()?.created?.seconds * 1000;

    const task = {
        task: snapshot.data()?.task,
        public: snapshot.data()?.public,
        created: new Date(milliseconds).toLocaleDateString(),
        user: snapshot.data()?.user,
        taskId: id,

    }

    return{
        props: {}
    }
}