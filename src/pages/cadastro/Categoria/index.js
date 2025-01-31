import React, { useState, useEffect } from 'react';
import PageDefault from '../../../components/PageDefault'
import { Link } from 'react-router-dom'
import FormField from '../../../components/FormField/index.js';
import Button from '../../../components/Button';
import useForm from '../../../hooks/useForm';

function CadastroCategoria() {
    const [categorias, setCategorias] = useState([]);

    const valoresIniciais = {
        nome: '',
        descricao: '',
        cor: ''
    }

    const { handleChange, values, clearForm } = useForm(valoresIniciais);
                        
    useEffect(() => {
        const URL = window.location.hostname.includes('localhost')
        ? 'http://localhost:8080/categorias'
        : 'https://aluraflix-marcelo.herokuapp.com/categorias'
        fetch(URL).then(async (response) => {
            const data = await response.json();
            setCategorias([
                ...data,
            ]);
        })
    }, []);

    return (
        <PageDefault>
            <h1>Cadastro de Categoria: {values.nome}</h1>

            <form onSubmit={function handleSubmit(infosDoEvento) {
                infosDoEvento.preventDefault();
                setCategorias([
                    ...categorias, // Pega tudo oq ja escreveu, nao sobrescreve, e coloca por baixo a nova
                    values
                ]);
                clearForm(valoresIniciais)
            }}> 

                <FormField 
                    label="Nome da Categoria"
                    name="nome"
                    type="text"
                    value={values.nome}
                    onChange={handleChange}
                />

                <FormField 
                    label="Descrição"
                    name="descricao"
                    type="textarea"
                    value={values.descricao}
                    onChange={handleChange}
                />
             
                <FormField 
                    label="Cor"
                    name="cor"
                    type="color"
                    value={values.cor}
                    onChange={handleChange}
                />                           

                <Button>
                    Cadastrar
                </Button>
            </form>

            { categorias.length === 0 && (
                <div>
                Loading...
            </div>
            )}

            <ul>
                {categorias.map((categorias) => {
                    return (
                        <li key={`${categorias.nome}`}>
                            {categorias.nome}
                        </li>
                    )                 
                })}
            </ul>
      
            <Link to="/">
                Ir para home
            </Link>
        </PageDefault>
    )
}

export default CadastroCategoria;