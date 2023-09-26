
import { useNavigate  } from "react-router-dom";
import { MdEmail, MdLock ,MdPermIdentity } from 'react-icons/md'
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { api } from '../../services/api';
import { Container, Title, Column, TitleLogin, SubtitleLogin, CriarText, Row, Wrapper, FormSize, FazerLogin, TextEnd, Margin } from './styles';
import { useForm } from "react-hook-form";
const Register = () => {
    const navigate = useNavigate()

    const { control, handleSubmit, formState: { errors  } } = useForm({
        reValidateMode: 'onChange',
        mode: 'onChange',
    });

    const onSubmit = async (formData) => {
        try{
            const {data} = await api.get(`/users?email=${formData.email}&senha=${formData.senha}`);
            
            if(data.length && data[0].id){
                navigate('/feed') 
                return
            }

            alert('Usuário ou senha inválido')
        }catch(e){
            //TODO: HOUVE UM ERRO
        }
    };

    console.log('errors', errors);

    return <>
    <Header/>
    
    <Container>
            <Column >
                <Title>A plataforma para você aprender com experts, dominar as principais tecnologias e entrar mais rápido nas empresas mais desejadas.</Title>
            </Column>
            <Column>
                <Wrapper>                    
                <TitleLogin>Comece agora grátis</TitleLogin>
                <SubtitleLogin>Crie sua conta e make the change._</SubtitleLogin>
                <FormSize> 
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input placeholder="Nome completo" leftIcon={<MdPermIdentity />} name="email"  control={control} />
                    <Input placeholder="E-mail" leftIcon={<MdEmail />} name="email"  control={control} />
                    {errors.email && <span>E-mail é obrigatório</span>}
                    <Input type="password" placeholder="Senha" leftIcon={<MdLock />}  name="senha" control={control} />
                    {errors.senha && <span>Senha é obrigatório</span>}
                    <Margin>
                    <Button title="Criar minha Conta " variant="secondary" type="submit"/></Margin>
                </form>
                </FormSize>
                <TextEnd>Ao clicar em "criar minha conta grátis", declaro que aceito as Políticas de Privacidade e os Termos de Uso da DIO.</TextEnd>
                <Row>                  
                    <CriarText> Já tenho uma conta.</CriarText>
                    <FazerLogin href="/login">{" "} Fazer login</FazerLogin>
                </Row>
                </Wrapper>
            </Column>
        </Container>
    </>

}

export {Register }