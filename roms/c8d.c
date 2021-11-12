#include <stdio.h>

int quit=0;
int m[0x0FFF-0x200]={0};
int pc=0x000;

int g() {
  int c;
  c=fgetc(stdin);
  return c;
}

int main() {

  int c1,c2,c3,c4;
  int n1,n2,n3;
  int w,b;
  int x,y,z;
  int oc;

  while(!quit) {
    b=g(); if(b==EOF) { quit=1; continue; };
    m[pc]=b;
    pc++;
  }

  for(int i=0;i<pc;i+=2) {
    printf(":%03X %02X%02X ",i+0x200,m[i],m[i+1]);
    oc=m[i]<<8 | m[i+1];
    x=(oc & 0x0F00) >> 8;
    y=(oc & 0x00F0) >> 4;
    switch(oc & 0xF000) {
      case 0x0000:

        switch(oc) {
          case 0x00E0: printf("CLS"); break;
        }

      break;
      case 0x1000: z = oc & 0x0FFF; printf("JMP 0x%03X",z); break;
      case 0x2000: break;
      case 0x3000: z = oc & 0x00FF; printf("V%X = 0x%02X",x,z); break;
      case 0x4000: break;
      case 0x5000: break;
      case 0x6000: break;
      case 0x7000: z = oc & 0x00FF; printf("V%X = V%X + 0x%02X",x,x,z); break;
      case 0x8000: break;
      case 0x9000: break;
      case 0xA000: z = oc & 0x0FFF; printf("I = 0x%03X",z); break;
      case 0xB000: break;
      case 0xC000: break;
      case 0xD000: z = oc & 0x000F; printf("DRW V%X, V%X, 0x%X",x,y,z); break;
      case 0xE000: break;
      case 0xF000: break;
    }
    printf("\n");
  }

  return 0;
}
