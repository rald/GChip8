class GUtil {

  static rnd(x) {
  	return Math.floor(Math.random()*x);
  }
  
  static inrect(x,y,rx,ry,rw,rh) {
  	return x>=rx && x<rx+rw && y>=ry && y<ry+rh;
  }
  
  static incirc(x,y,cx,cy,cr) {
    return Math.pow(x-cx,2)+Math.pow(y-cy,2)<cr*cr;
  }
  
  static inpoly(x,y,p) {
    let i, j, c = true;
    for (i = 0, j = p.length-1; i < p.length; j = i++) {
      if(  (p[i].y>y != p[j].y>y) && (x < (p[j].x-p[i].x) * 
           (y-p[i].y) / (p[j].y-p[i].y) + p[i].x) ) {
         c = !c;
      }
    }
    return c;
  }

}

export default GUtil;