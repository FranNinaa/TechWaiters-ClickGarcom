import { useState, ChangeEvent } from 'react';
import Head from 'next/head';
import styles from './styles.module.scss';
import { canSSRAuth } from '../../utils/canSSRAuth';
import { Header } from '../../components/Header';
import { FiUpload } from 'react-icons/fi'
import { setupAPIClient } from '../../services/api';

type ItemProps = {
    Id: string;
    Nome: string;
}

interface ProductProps {
    categoryList: ItemProps[];
}

export default function Product({ categoryList }: ProductProps) {
    const [avatarUrl, setAvatarUrl] = useState('');
    const [imgAvatar, setImageAvatar] = useState<File | null>(null);
    const [categories, setCategories] = useState(categoryList || []);
    const [categorySelected, setCategorySelected] = useState('');

    function handelFile(e: ChangeEvent<HTMLInputElement>) {
        if (!e.target.files) {
            return;
        }

        const image = e.target.files[0];

        if (!image) {
            return;
        }

        if (image.type === 'image/jpeg' || image.type === 'image/png') {
            setImageAvatar(image);
            setAvatarUrl(URL.createObjectURL(e.target.files[0]));
        }

    }

    function handleChangeCategory(e: ChangeEvent<HTMLSelectElement>) {
        setCategorySelected(e.target.value);
    }

    return (
        <>
            <Head>
                <title>Novo Produto - Click Garçom</title>
            </Head>
            <div>
                <Header />
                <main className={styles.container}>
                    <h1>Novo Produto</h1>

                    <form className={styles.form}>

                        <label className={styles.labelAvatar}>
                            <span>
                                <FiUpload size={30} color="#fff" />
                            </span>

                            <input
                                onChange={handelFile}
                                type="file"
                                className={styles.input}
                                accept='img/png, img/jpg,'
                            />

                            {avatarUrl && (
                                <img
                                    className={styles.preview}
                                    src={avatarUrl}
                                    alt="Foto do produto"
                                    width={150}
                                    height={150}
                                />
                            )}

                        </label>


                        <select value={categorySelected} onChange={handleChangeCategory}>
                            {categories.map((item, index) => (
                                <option key={item.Id} value={index.toString()}>
                                    {item.Nome}
                                </option>
                            ))}
                        </select>

                        <input
                            type="text"
                            placeholder="Digite o nome do produto!"
                            className={styles.input}
                        />

                        <input
                            type="text"
                            placeholder="Digite o preço do produto!"
                            className={styles.input}
                        />

                        <textarea
                            placeholder='Descreva seu produto'
                            className={styles.input}
                        />

                        <button type='submit' className={styles.buttonAdd}>
                            Cadastrar Produto
                        </button>
                    </form>
                </main>
            </div>
        </>

    );
}


export const getServerSideProps = canSSRAuth(async (ctx) => {
    const apiClient = setupAPIClient(ctx);

    const response = await apiClient.get('/category');
    //console.log(response.data);

    return {
        props: {
            categoryList: response.data
        }
    }
})


