#include <stdio.h>

int quit=0;
int m[0x0FFF-0x200]={0};
int pc=0x000;

int v(char c) {
  char h[]="0123456789ABCDEF";
  int i=0,j=-1;
  while(h[i]) {
    if(c==h[i]) {
      j=i;
      break;
    }
    i++;
  }
  return j;
}

int g() {
  int c=0;
  do {
    c=fgetc(stdin);
    if(c==EOF) break;
  } while(c==' ' || c=='\t' || c=='\n');
  return c;
}

int main() {

  int c1,c2,c3,c4;
  int n1,n2,n3;
  int w,b;
  int x,y,z;
  int oc;

  while(!quit) {
    c1=g(); if(c1==EOF) { quit=1; continue; };
    if(c1==':') {
      c2=g(); if(c2==EOF) { quit=1; continue; };
      n1=v(c2); if(n1==-1) { quit=1; continue; };
      c3=g(); if(c3==EOF) { quit=1; continue; };
      n2=v(c3); if(n2==-1) { quit=1; continue; };
      c4=g(); if(c3==EOF) { quit=1; continue; };
      n3=v(c4); if(n3==-1) { quit=1; continue; };
      w=n1 << 8 | n2 << 4 | n3;
      pc=w & 0x0FFF;
    } else {
      n1=v(c1); if(n1==-1) { quit=1; continue; };
      c2=g(); if(c2==EOF) { quit=1; continue; };
      n2=v(c2); if(n2==-1) { quit=1; continue; };
      b=n1 << 4 | n2;
      m[pc]=b;
      pc++;
    }
  }

  for(int i=0;i<pc;i++) {
    fputc(m[i],stdout);
  }

  return 0;
}
