import React, { useState, useEffect } from 'react';
import PageDefault from '../../../components/PageDefault'
import { Link, useHistory } from 'react-router-dom'
import useForm from '../../../hooks/useForm';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';
import videosRepository from '../../../repositories/videos'
import categoriasRepository from '../../../repositories/categorias'

function CadastroVideo() {

    const history = useHistory();
    const [categorias, setCategorias] = useState([]);
    const { handleChange, values} = useForm({
        titulo: 'Video padrao',
        url: 'www.youtube.com',
        categoria: 'Front End',
    });

    useEffect(() => {

        categoriasRepository
            .getAll()
            .then((categoriasFromServer) => {
                setCategorias(categoriasFromServer);
            })
    }, []);

    return (
        <PageDefault>
            <h1>Cadastro de Video</h1>

            <form onSubmit={(e) => {
                e.preventDefault();

                const categoriaEscolhida = categorias.find((categorias) => {
                    return categorias.titulo === values.categoria;
                })

                videosRepository.createVideo({
                    titulo: values.titulo,
                    url: values.url,
                    categoriaId: categoriaEscolhida.id,
                })
                .then(() => {
                    history.push('/');
                });
            }}>
                <FormField 
                    label="Título do Vídeo"
                    name="titulo"
                    value={values.titulo}
                    onChange={handleChange}
                />

                <FormField 
                    label="URL"
                    name="url"
                    value={values.url}
                    onChange={handleChange}
                />

                <FormField 
                    label="Categoria"
                    name="categoria"
                    value={values.categoria}
                    onChange={handleChange}
                />

                <Button type="submit">
                    Cadastrar
                </Button>
            </form>
      
            <Link to="/cadastro/categoria">
                Cadastrar Categoria
            </Link>
        </PageDefault>
    )
}

export default CadastroVideo;