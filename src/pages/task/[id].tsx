import { Textarea } from "@/components/textArea";
import { db } from "@/services/firebaseConnection";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { Session } from "inspector";
import { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { ChangeEvent, FormEvent, useState } from "react";
import styles from "../task/styles.module.css";

interface TaskProps {
  item: {
    task: string;
    created: string;
    public: boolean;
    user: string;
    taskId: string;
  };
}

export default function Task({ item }: TaskProps) {
  const { data: session } = useSession();
  const [input, setInput] = useState("");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (input === "") return;

    if (!session?.user?.email || !session?.user?.name) return;

    try {
      const docRef = await addDoc(collection(db, "comments"), {
        comment: input,
        created: new Date(),
        user: session?.user?.email,
        name: session?.user?.name,
        taskId: item?.taskId,
      });

      setInput("");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Task - Task details</title>
      </Head>

      <main className={styles.main}>
        <h1>Task</h1>
        <article className={styles.task}>
          <p>{item.task}</p>
        </article>
      </main>

      <section className={styles.commentsContainer}>
        <h2>Leave a comment</h2>

        <form onSubmit={handleSubmit}>
          <Textarea
            value={input}
            placeholder="Type something!..."
            onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
              setInput(event.target.value);
            }}
          />
          <button className={styles.button} disabled={!session?.user}>
            Send
          </button>
        </form>
      </section>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id as string;

  const docRef = doc(db, "task", id);

  const snapshot = await getDoc(docRef);

  if (snapshot.data() === undefined) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  if (!snapshot.data()?.public) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const milliseconds = snapshot.data()?.created?.seconds * 1000;

  const task = {
    task: snapshot.data()?.task,
    public: snapshot.data()?.public,
    created: new Date(milliseconds).toLocaleDateString(),
    user: snapshot.data()?.user,
    taskId: id,
  };

  return {
    props: {
      item: task,
    },
  };
};
