// The attributes a document's header sets, author and revision lines included.
import { describe, expect, it } from 'vitest';
import { headerAttributes } from '../src/core/asciidoc/config.js';

describe('headerAttributes', () => {
  it('reads the entries under the title', () => {
    expect(headerAttributes('= Title\n:toc:\n:imagesdir: images\n:x!:\n\n:after: no\n')).toEqual({ toc: '', imagesdir: 'images' });
  });

  it('reads the author and revision lines, as Asciidoctor does', () => {
    expect(headerAttributes('= Harbor\nHarbor Labs\nv2.4.0\n:toc:\n')).toEqual({ author: 'Harbor Labs', revnumber: '2.4.0', toc: '' });
    expect(headerAttributes('= T\nDoc Writer <doc@example.com>; Another One\nv1.0, 2026-01-01: First release\n')).toEqual({
      author: 'Doc Writer',
      email: 'doc@example.com',
      revnumber: '1.0',
      revdate: '2026-01-01',
      revremark: 'First release',
    });
    expect(headerAttributes('= T\nA Writer\n2026-01-01\n')).toEqual({ author: 'A Writer', revdate: '2026-01-01' });
    // Entries straight under the title: no author line.
    expect(headerAttributes('= T\n:author: Set Here\nnot an author\n')).toEqual({ author: 'Set Here' });
  });
});
