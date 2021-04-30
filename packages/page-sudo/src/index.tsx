// Copyright 2017-2021 @polkadot/app-js authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { AppProps as Props } from '@polkadot/react-components/types';

import React, { useRef } from 'react';
import { Route, Switch } from 'react-router';

import { MarkError, Tabs } from '@polkadot/react-components';
import { useSudo } from '@polkadot/react-hooks';

import SetKey from './SetKey';
import Sudo from './Sudo';
import { useTranslation } from './translate';

function SudoApp ({ basePath }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const { hasSudoKey, sudoKey } = useSudo();

  const itemsRef = useRef([
    {
      isRoot: true,
      name: 'index',
      text: t<string>('Sudo access')
    },
    {
      name: 'key',
      text: t<string>('Set sudo key')
    }
  ]);

  return (
    <main>
      <Tabs
        basePath={basePath}
        items={itemsRef.current}
      />
      {hasSudoKey
        ? (
          <Switch>
            <Route path={`${basePath}/key`}>
              <SetKey
                isMine={hasSudoKey}
                sudoKey={sudoKey}
              />
            </Route>
            <Route>
              <Sudo
                isMine={hasSudoKey}
                sudoKey={sudoKey}
              />
            </Route>
          </Switch>
        )
        : <MarkError content={t<string>('You do not have access to the current sudo key')} />
      }
    </main>
  );
}

export default React.memo(SudoApp);
