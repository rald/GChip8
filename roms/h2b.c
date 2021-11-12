#include <stdio.h>

int v(char c) {
  char *h="0123456789ABCDEF";
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

int main() {

  int quit=0;

  char c1,c2;
  int n1,n2;
  int b;

  while(!quit) {

    do {
      c1=fgetc(stdin);
      if(c1==EOF) { quit=1; continue; }
    } while(c1==' ' || c1=='\t' || c1=='\n');
    n1=v(c1);
    if(n1==-1) { quit=1; continue; }

    do {
      c2=fgetc(stdin);
      if(c2==EOF) { quit=1; continue; }
    } while(c2==' ' || c2=='\t' || c2=='\n');
    n2=v(c2);
    if(n2==-1) { quit=1; continue; }

    b=n1<<4|n2;

    fputc(b,stdout);
  }
  return 0;
}
