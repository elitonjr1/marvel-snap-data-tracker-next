import React from "react";
import styled from 'styled-components';
import { CgProfile } from 'react-icons/cg'
import { GrLogout, GrLogin } from "react-icons/gr"
import { signOut, useSession } from 'next-auth/react';
const AppBarItems = () => {
    const { status } = useSession();
    return <AppBarItemsDiv>
        {status === "authenticated" && (
        <>          
          <a
            href="/api/auth/signout"
            className="item"
            title="Sair"
            onClick={(event) => {
              event.preventDefault();
              signOut();
            }}
          >
            <GrLogout size="22px" aria-label="Sair" />
          </a>
        </>
      )}
      {status === "unauthenticated" && (
        <a className="item" href="/api/auth/signin" title="Entrar">
          <GrLogin size="22px" aria-label="Entrar" />
        </a>
      )}

        <a href="/">
            <CgProfileEdit size="22px"></CgProfileEdit>
        </a>
    </AppBarItemsDiv>
}

export default AppBarItems;

const AppBarItemsDiv = styled.div`

display: flex;
justify-content: flex-end;
align-items: center;
`

const CgProfileEdit = styled(CgProfile) `
    color: black;
`