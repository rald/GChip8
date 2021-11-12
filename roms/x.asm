L200: LD   I,  #000           ; A000
      LD   V0, #00            ; 6000
      LD   V1, #00            ; 6100
      LD   V2, #05            ; 6205
      LD   V3, #08            ; 6308
      LD   V4, #07            ; 6407
      LD   V5, #09            ; 6509
      LD   V6, #01            ; 6601
L210: CLS                     ; 00E0
      DRW  V0, V1, #5         ; D015
      SKNP V2                 ; E2A1
      SUB  V1, V6             ; 8165
      SKNP V3                 ; E3A1
      ADD  V1, V6             ; 8164
      SKNP V4                 ; E4A1
      SUB  V0, V6             ; 8065
      SKNP V5                 ; E5A1
      ADD  V0, V6             ; 8064
      JP   L210               ; 1210
