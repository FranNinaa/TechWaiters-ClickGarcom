import { useState, ChangeEvent, FormEvent } from 'react';
import Head from 'next/head';
import styles from './styles.module.scss';
import { canSSRAuth } from '../../utils/canSSRAuth';
import { Header } from '../../components/Header';
import { FiUpload } from 'react-icons/fi'
import { setupAPIClient } from '../../services/api';
import { toast } from 'react-toastify'

type ItemProps = {
    Id: string;
    Nome: string;
}

interface ProductProps {
    categoryList: ItemProps[];
}

export default function Product({ categoryList }: ProductProps) {
    const [nome, setNome] = useState('');
    const [preco, setPreco] = useState('');
    const [descricao, setDescricao] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');
    const [imgAvatar, setImageAvatar] = useState<File | null>(null);
    const [categories, setCategories] = useState(categoryList || []);
    const [categorySelected, setCategorySelected] = useState(0);

    function handelFile(e: ChangeEvent<HTMLInputElement>): void {
        if (!e.target.files || e.target.files.length === 0) {
            return;
        }

        const image = e.target.files[0];

        if (!image) {
            return;
        }

        if (image.type === 'image/jpeg' || image.type === 'image/png') {
            setImageAvatar(image);
            setAvatarUrl(URL.createObjectURL(image));
        }

    }

    function handleChangeCategory(event: ChangeEvent<HTMLSelectElement>) {
        const value = parseInt(event.target.value);
        setCategorySelected(value);
    }

    async function handleProduto(e: FormEvent) {
        e.preventDefault();

        try {
            const data = new FormData();

            if (nome === '' || preco === '' || descricao === '' || imgAvatar === null) {
                toast.error('Preencha todos os campos');
                return;
            }

            data.append('Nome', nome);
            data.append('Preco', preco);
            data.append('Descricao', descricao);
            data.append('file', imgAvatar);
            data.append('categoria_id', categories[categorySelected].Id);

            const apiClient = setupAPIClient();
            await apiClient.post('/produtos', data);

            toast.success('Produto cadastrado com sucesso');


        } catch (error) {
            console.log(error);
            toast.error('Erro ao cadastrar produto');
        }
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

                    <form className={styles.form} onSubmit={handleProduto}>

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
                            {categories.map((item, index) => {
                                return (
                                    <option key={item.Id} value={index}>
                                        {item.Nome}
                                    </option>
                                )
                            })}
                        </select>

                        <input
                            type="text"
                            placeholder="Digite o nome do produto!"
                            className={styles.input}
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />

                        <input
                            type="text"
                            placeholder="Digite o preço do produto!"
                            className={styles.input}
                            value={preco}
                            onChange={(e) => setPreco(e.target.value)}
                        />

                        <textarea
                            placeholder='Descreva seu produto'
                            className={styles.input}
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
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