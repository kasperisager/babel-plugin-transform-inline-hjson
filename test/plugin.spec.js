import test from 'ava';
import {transform} from 'babel-core';
import plugin from '../src/plugin';

test('transforms a Hsjon import to inline JavaScript', t => {
  const {code} = transform(
    `
    import foo from './fixtures/foo.hjson'
    `,
    {
      filename: __filename,
      plugins: [
        plugin
      ]
    }
  );

  t.snapshot(code);
});

test('allows whitelisting files that should be inlined', t => {
  const {code} = transform(
    `
    import foo from './fixtures/foo.hjson'
    import bar from './fixtures/bar.hjson'
    `,
    {
      filename: __filename,
      plugins: [
        [
          plugin,
          {
            include: 'f*.hjson'
          }
        ]
      ]
    }
  );

  t.snapshot(code);
});

test('throws an exception when a Hjson import cannot be found', t => {
  t.throws(() => transform(
    `
    import bar from './fixtures/bar.hjson'
    `,
    {
      filename: __filename,
      plugins: [
        plugin
      ]
    }
  ));
});
