export function isEmailAddress(email) {
  if (!email || typeof email !== 'string') return false;

  const localPartMaxLength = 64;
  const domainPartMaxLength = 252;
  
  const [localPart, domainPart] = email.split('@');
  if (!localPart || !domainPart) return false;
  
  if (localPart.length > localPartMaxLength) return false;
  if (domainPart.length > domainPartMaxLength) return false;
  
  const localPartPattern = /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*$/; // 小文字のアルファベット、大文字のアルファベット、数字、特殊文字が1回以上繰り返される。()内が0回以上繰り返される。
  const domainPartPattern = /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*$/;
  
  if (!localPartPattern.test(localPart)) return false;
  if (!domainPartPattern.test(domainPart)) return false;

  return true;
}

/* 
dot-atomとは：
　「dot-atom」とは、メールアドレスのローカルパート（@の前の部分）に使われる形式の一つ。
　RFC5322で定義されている。
　Atom: アルファベット（A-Z、a-z）、数字（0-9）、および特定の記号（!#$%&'*±/=?^_`{|}~）の組み合わせ。
　dot-Atom: 複数のAtomがドット（.）で区切られたもの。連続したピリオドは許されず、また先頭や末尾にピリオドが来ることも許されない。

CWFSとは：
　「Comments, White Spaces, Folding White Spaces」の略。
　コメントや空白、改行などの空白折り返しを含む。メールアドレスにはCWFSは含めない。
*/