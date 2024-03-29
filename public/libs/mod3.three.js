/**
 *
 * MOD3  Plugin for Three.js
 *
 *
 **/
!(function (e) {
  'use strict';
  var t = e.ModConstant,
    r = (t.X, t.Y, t.Z, e.xyz),
    n = e.XYZi,
    i = e.VecArray,
    u = e.Class(e.VertexProxy, {
      constructor: function (e, t) {
        this.$super('constructor', [e, t]), (this.name = 'VertexThree');
      },
      setVertex: function (e) {
        var t = this;
        return (t.vertex = e), (t.original = new i([e.x, e.y, e.z])), t;
      },
      getXYZ: function () {
        var e = this.vertex,
          t = new i(3);
        return (t[0] = e.x), (t[1] = e.y), (t[2] = e.z), t;
      },
      getX: function () {
        return this.vertex.x;
      },
      getY: function () {
        return this.vertex.y;
      },
      getZ: function () {
        return this.vertex.z;
      },
      getValue: function (e) {
        return this.vertex[r[n[e]]] || 0;
      },
      setXYZ: function (e) {
        var t = this.vertex;
        return (t.x = e[0]), (t.y = e[1]), (t.z = e[2]), this;
      },
      setX: function (e) {
        return (this.vertex.x = e), this;
      },
      setY: function (e) {
        return (this.vertex.y = e), this;
      },
      setZ: function (e) {
        return (this.vertex.z = e), this;
      },
      setValue: function (e, t) {
        return (this.vertex[r[n[e]]] = t), this;
      },
      reset: function () {
        var e = this,
          t = e.vertex,
          r = e.original;
        return (t.x = r[0]), (t.y = r[1]), (t.z = r[2]), e;
      },
      collapse: function () {
        var e = this,
          t = e.vertex,
          r = e.original;
        return (r[0] = t.x), (r[1] = t.y), (r[2] = t.z), e;
      },
    }),
    t = e.Class(e.MeshProxy, {
      constructor: function (e) {
        this.$super('constructor', [e]), (this.name = 'MeshThree');
      },
      init: function (e) {
        var t = this;
        t.$super('init', [e]);
        var r,
          n,
          i = (e = t.mesh).geometry.vertices,
          s = i.length;
        for (t.faces = null, t.vertices = r = new Array(s), n = 0; n < s; ++n)
          r[n] = new u(i[n], t);
        return t;
      },
      update: function () {
        var e = this.mesh.geometry;
        return (
          (e.verticesNeedUpdate = !0),
          (e.elementsNeedUpdate = !0),
          (e.uvsNeedUpdate = !0),
          (e.normalsNeedUpdate = !0),
          (e.colorsNeedUpdate = !0),
          (e.lineDistancesNeedUpdate = !0),
          (e.groupsNeedUpdate = !0),
          (e.buffersNeedUpdate = !0),
          (e.dynamic = !0),
          this
        );
      },
      updateMeshPosition: function (e) {
        var t = this.mesh.position,
          e = e.xyz;
        return (t.x += e[0]), (t.y += e[1]), (t.z += e[2]), this;
      },
    });
  e.LibraryThree = {
    id: 'Three',
    Mesh: t,
    Vertex: u,
  };
})(MOD3);
