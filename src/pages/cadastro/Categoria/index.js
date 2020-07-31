import React, { useState } from 'react';
import PageDefault from '../../../components/PageDefault'
import { Link } from 'react-router-dom'
import FormField from '../../../components/FormField/index.js';

function CadastroCategoria() {
    const [categorias, setCategorias] = useState([]);

    const valoresIniciais = {
        nome: '',
        descricao: '',
        cor: ''
    }
    const [values, setValues] = useState(valoresIniciais);

    function setValue (chave, valor) {
        setValues({
            ...values,
            [chave]: valor
        })
    }

    function handleChange(e) {
        setValue(
            e.target.getAttribute('name'),
            e.target.value
        );
    }                   

    return (
        <PageDefault>
            <h1>Cadastro de Categoria: {values.nome}</h1>

            <form onSubmit={function handleSubmit(infosDoEvento) {
                infosDoEvento.preventDefault();
                setCategorias([
                    ...categorias, // Pega tudo oq ja escreveu, nao sobrescreve, e coloca por baixo a nova
                    values
                ]);
                setValues(valoresIniciais)
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
                    type="text"
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
               
               {/*
                <div> 
                    <label>
                        Color:
                        <input
                            type="color"
                            name="cor"
                            value={values.cor}
                            onChange={handleChange}                   
                        />
                    </label>
                </div>      
               */}  

                <button>
                    Cadastrar
                </button>
            </form>

            <ul>
                {categorias.map((categorias, indice) => {
                    return (
                        <li key={`${categorias}${indice}`}>
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