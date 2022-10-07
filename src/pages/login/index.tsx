import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Text,
  useTheme,
} from '@chakra-ui/react';
import { FiGithub, FiLock, FiUser } from 'react-icons/fi';

import { GetServerSideProps } from 'next';

import { signIn, getSession } from 'next-auth/react';
import { FormEvent } from 'react';

function Login() {
  const theme = useTheme();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    signIn('credentials');
  };

  return (
    <Flex
      width='100%'
      height='100vh'
      alignItems='center'
      justifyContent='center'
    >
      <form onSubmit={onSubmit}>
        <Box width='428px'>
          <Text
            color='gray.100'
            fontSize='xl'
            textAlign='center'
            fontFamily='heading'
            fontWeight={600}
            marginBottom='2rem'
          >
            Sign in to your account
          </Text>
          <InputGroup>
            <InputLeftElement pointerEvents='none'>
              <FiUser color={theme.colors.gray['500']} />
            </InputLeftElement>
            <Input
              placeholder='Email'
              marginBottom='1rem'
              borderColor='gray.700'
              backgroundColor='gray.700'
              color='gray.100'
            />
          </InputGroup>
          <InputGroup>
            <InputLeftElement pointerEvents='none'>
              <FiLock color={theme.colors.gray['500']} />
            </InputLeftElement>
            <Input
              placeholder='Senha'
              borderColor='gray.700'
              backgroundColor='gray.700'
              color='gray.100'
              type='password'
            />
          </InputGroup>

          <Flex direction='column' alignItems='center'>
            <Button
              type='submit'
              marginTop='2rem'
              marginBottom='1rem'
              width='100%'
              backgroundColor='secondary.500'
              _hover={{ backgroundColor: 'secondary.600' }}
            >
              Sign In
            </Button>
            <Link href='#' color='gray.100'>
              Don't have an account?
              <Text as='span' color='secondary.500'>
                {' '}
                Sign Up
              </Text>
            </Link>
          </Flex>

          <Flex marginTop='2rem' alignItems='center' justifyContent='center'>
            <Text color='secondary.500' textAlign='center' marginRight='1rem'>
              Or Sign In with
            </Text>
            <Button
              backgroundColor='gray.600'
              name='Login with Github'
              leftIcon={<FiGithub color={theme.colors.gray['100']} />}
              color={theme.colors.gray['100']}
              _hover={{ backgroundColor: 'gray.700' }}
              onClick={() => signIn('github')}
            >
              Github
            </Button>
          </Flex>
        </Box>
      </form>
    </Flex>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  console.log(session);

  if (session) {
    return {
      redirect: {
        destination: '/home',
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};

export default Login;
