import React, { useState } from "react";
import {
  Home, Package, ShoppingCart, Users, Truck, LogOut, Plus, Check, X,
  Leaf, Apple, Wheat, ClipboardList, UserCheck, Minus, Trash2, MapPin, Phone,
  Search, Clock, Zap, IndianRupee, Navigation
} from "lucide-react";

const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;700;800&family=Inter:wght@400;500;600;700&display=swap');`;

const COLORS = {
  cream: "#FAF6EC",
  forest: "#1F4D3A",
  leaf: "#4C8C4A",
  turmeric: "#E8A93B",
  tomato: "#C1442D",
  ink: "#2B2620",
  line: "#E4DCC8",
};

const CATEGORY_META = {
  Vegetable: { icon: Leaf, color: COLORS.leaf },
  Fruit: { icon: Apple, color: COLORS.tomato },
  Grocery: { icon: Wheat, color: COLORS.turmeric },
};

const initialProducts = [
  { id: "p1", name: "Aloo (Potato)", category: "Vegetable", price: 28, unit: "kg", stock: 120 },
  { id: "p2", name: "Pyaz (Onion)", category: "Vegetable", price: 32, unit: "kg", stock: 90 },
  { id: "p3", name: "Tamatar (Tomato)", category: "Vegetable", price: 40, unit: "kg", stock: 60 },
  { id: "p4", name: "Kela (Banana)", category: "Fruit", price: 50, unit: "dozen", stock: 40 },
  { id: "p5", name: "Seb (Apple)", category: "Fruit", price: 180, unit: "kg", stock: 35 },
  { id: "p6", name: "Aata (Wheat Flour)", category: "Grocery", price: 320, unit: "10kg bag", stock: 25 },
  { id: "p7", name: "Chawal (Rice)", category: "Grocery", price: 65, unit: "kg", stock: 80 },
  { id: "p8", name: "Toor Dal", category: "Grocery", price: 140, unit: "kg", stock: 55 },
];

const initialVendors = [
  { id: "v1", name: "Ramesh Kirana", phone: "98765 43210", status: "Approved", area: "Sector 12" },
  { id: "v2", name: "Suresh Traders", phone: "91234 56780", status: "Approved", area: "Gomti Nagar" },
  { id: "v3", name: "Naya Bazaar Supplies", phone: "99887 66554", status: "Pending", area: "Alambagh" },
];

const initialCustomers = [
  { id: "c1", name: "Priya Sharma", phone: "90000 11111", orders: 4 },
  { id: "c2", name: "Amit Verma", phone: "90000 22222", orders: 2 },
];

const STATUS_FLOW = ["Placed", "Confirmed", "Assigned", "Out for Delivery", "Delivered"];
const STATUS_COLOR = {
  Placed: COLORS.turmeric,
  Confirmed: COLORS.leaf,
  Assigned: "#5B7FBF",
  "Out for Delivery": COLORS.tomato,
  Delivered: COLORS.forest,
};

let idCounter = 100;
const nextId = (prefix) => `${prefix}${idCounter++}`;

function Badge({ text, color }) {
  return (
    <span
      style={{
        background: color + "22",
        color,
        border: `1px solid ${color}55`,
        fontWeight: 600,
        fontSize: 12,
        padding: "3px 10px",
        borderRadius: 999,
        whiteSpace: "nowrap",
      }}
    >
      {text}
    </span>
  );
}

function TopBar({ title, subtitle, roleLabel, roleColor, onLogout }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 20px",
        borderBottom: `1px solid ${COLORS.line}`,
        background: "#fff",
      }}
    >
      <div>
        <div style={{ fontFamily: "'Baloo 2'", fontWeight: 700, fontSize: 20, color: COLORS.forest }}>
          {title}
        </div>
        {subtitle && <div style={{ fontSize: 13, color: "#8A8168" }}>{subtitle}</div>}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <Badge text={roleLabel} color={roleColor} />
        <button
          onClick={onLogout}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            background: "none",
            border: `1px solid ${COLORS.line}`,
            borderRadius: 8,
            padding: "6px 12px",
            fontSize: 13,
            color: COLORS.ink,
            cursor: "pointer",
          }}
        >
          <LogOut size={14} /> Logout
        </button>
      </div>
    </div>
  );
}

function SideNav({ items, active, onSelect, accent }) {
  return (
    <div
      style={{
        width: 210,
        borderRight: `1px solid ${COLORS.line}`,
        background: "#fff",
        padding: "16px 10px",
        flexShrink: 0,
      }}
      className="anp-sidenav"
    >
      {items.map((it) => {
        const Icon = it.icon;
        const isActive = active === it.key;
        return (
          <button
            key={it.key}
            onClick={() => onSelect(it.key)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              width: "100%",
              padding: "10px 12px",
              marginBottom: 4,
              borderRadius: 10,
              border: "none",
              cursor: "pointer",
              background: isActive ? accent + "1A" : "transparent",
              color: isActive ? accent : COLORS.ink,
              fontWeight: isActive ? 700 : 500,
              fontSize: 14,
              textAlign: "left",
            }}
          >
            <Icon size={17} />
            {it.label}
          </button>
        );
      })}
    </div>
  );
}

function BottomNav({ items, active, onSelect, accent }) {
  return (
    <div
      className="anp-bottomnav"
      style={{
        display: "none",
        position: "sticky",
        bottom: 0,
        background: "#fff",
        borderTop: `1px solid ${COLORS.line}`,
        justifyContent: "space-around",
        padding: "8px 4px",
      }}
    >
      {items.map((it) => {
        const Icon = it.icon;
        const isActive = active === it.key;
        return (
          <button
            key={it.key}
            onClick={() => onSelect(it.key)}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              background: "none",
              border: "none",
              color: isActive ? accent : "#9A9276",
              fontSize: 11,
              fontWeight: isActive ? 700 : 500,
              cursor: "pointer",
            }}
          >
            <Icon size={19} />
            {it.label}
          </button>
        );
      })}
    </div>
  );
}

function StatCard({ label, value, color }) {
  return (
    <div
      style={{
        background: "#fff",
        border: `1px solid ${COLORS.line}`,
        borderRadius: 14,
        padding: "16px 18px",
        flex: "1 1 140px",
      }}
    >
      <div style={{ fontSize: 12, color: "#8A8168", fontWeight: 600, marginBottom: 6 }}>{label}</div>
      <div style={{ fontFamily: "'Baloo 2'", fontSize: 26, fontWeight: 800, color }}>{value}</div>
    </div>
  );
}

// ---------------- LOGIN ----------------
function LoginScreen({ onLogin }) {
  const [role, setRole] = useState("customer");
  const [step, setStep] = useState("role"); // "role" | "profile" (customer only)
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [profile, setProfile] = useState({ name: "", address: "", landmark: "", city: "", pincode: "" });

  const roles = [
    { key: "admin", label: "Admin", desc: "Sab manage karein", icon: ClipboardList, color: COLORS.forest },
    { key: "customer", label: "Customer", desc: "Order karein", icon: ShoppingCart, color: COLORS.tomato },
    { key: "vendor", label: "Vendor", desc: "Delivery karein", icon: Truck, color: COLORS.turmeric },
  ];
  const activeRole = roles.find((r) => r.key === role);

  const submitPhone = () => {
    if (phone.trim().length < 10) return;
    setStep("profile");
  };

  const submitProfile = () => {
    if (!profile.name.trim() || !profile.address.trim()) return;
    onLogin("customer", {
      name: profile.name.trim(),
      phone: phone.trim(),
      address: profile.address.trim(),
      landmark: profile.landmark.trim(),
      city: profile.city.trim(),
      pincode: profile.pincode.trim(),
    });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: `linear-gradient(180deg, ${COLORS.forest} 0%, #163A2C 100%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <div
        style={{
          background: COLORS.cream,
          borderRadius: 22,
          padding: "36px 30px",
          width: "100%",
          maxWidth: 420,
          boxShadow: "0 20px 50px rgba(0,0,0,0.35)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 26 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: COLORS.forest,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 14px",
            }}
          >
            <Leaf size={28} color={COLORS.turmeric} />
          </div>
          <div style={{ fontFamily: "'Baloo 2'", fontWeight: 800, fontSize: 26, color: COLORS.forest }}>
            Annapurna Daily Needs
          </div>
          <div style={{ fontSize: 13, color: "#8A8168", marginTop: 4 }}>
            Taza sabzi, fal aur grocery — ek jagah
          </div>
        </div>

        {step === "role" && (
          <>
            <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
              {roles.map((r) => {
                const Icon = r.icon;
                const isActive = role === r.key;
                return (
                  <button
                    key={r.key}
                    onClick={() => setRole(r.key)}
                    style={{
                      flex: 1,
                      padding: "14px 6px",
                      borderRadius: 12,
                      border: isActive ? `2px solid ${r.color}` : `1px solid ${COLORS.line}`,
                      background: isActive ? r.color + "14" : "#fff",
                      cursor: "pointer",
                      textAlign: "center",
                    }}
                  >
                    <Icon size={20} color={r.color} style={{ margin: "0 auto 6px" }} />
                    <div style={{ fontSize: 12.5, fontWeight: 700, color: COLORS.ink }}>{r.label}</div>
                    <div style={{ fontSize: 10.5, color: "#8A8168" }}>{r.desc}</div>
                  </button>
                );
              })}
            </div>

            {role === "customer" ? (
              <>
                <label style={{ fontSize: 12.5, fontWeight: 600, color: COLORS.ink }}>Mobile number</label>
                <div style={{ position: "relative", marginTop: 6, marginBottom: 18 }}>
                  <Phone size={15} color="#A6A088" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, "").slice(0, 10))}
                    placeholder="10-digit mobile number"
                    style={{
                      width: "100%", padding: "11px 14px 11px 34px", borderRadius: 10,
                      border: `1px solid ${COLORS.line}`, fontSize: 14, outline: "none", boxSizing: "border-box",
                    }}
                  />
                </div>
                <button
                  onClick={submitPhone}
                  disabled={phone.trim().length < 10}
                  style={{
                    width: "100%", padding: "13px 0", borderRadius: 10, border: "none",
                    background: phone.trim().length < 10 ? "#B7C9BE" : COLORS.forest, color: "#fff",
                    fontWeight: 700, fontSize: 15, cursor: phone.trim().length < 10 ? "not-allowed" : "pointer",
                  }}
                >
                  Continue
                </button>
              </>
            ) : (
              <>
                <label style={{ fontSize: 12.5, fontWeight: 600, color: COLORS.ink }}>Aapka naam</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ramesh Kirana"
                  style={{
                    width: "100%", marginTop: 6, marginBottom: 18, padding: "11px 14px", borderRadius: 10,
                    border: `1px solid ${COLORS.line}`, fontSize: 14, outline: "none", boxSizing: "border-box",
                  }}
                />
                <button
                  onClick={() => onLogin(role, { name: name.trim() || activeRole.label })}
                  style={{
                    width: "100%", padding: "13px 0", borderRadius: 10, border: "none",
                    background: COLORS.forest, color: "#fff", fontWeight: 700, fontSize: 15, cursor: "pointer",
                  }}
                >
                  {activeRole.label} ke roop mein Login karein
                </button>
              </>
            )}
            <div style={{ textAlign: "center", fontSize: 11, color: "#A6A088", marginTop: 14 }}>
              Demo prototype — koi bhi naam/number daalkar login karein
            </div>
          </>
        )}

        {step === "profile" && (
          <>
            <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.forest, marginBottom: 2 }}>
              Apni delivery profile complete karein
            </div>
            <div style={{ fontSize: 12, color: "#8A8168", marginBottom: 16 }}>
              Taki delivery partner aasani se aap tak pahunch sake.
            </div>

            <ProfileInput label="Poora naam" value={profile.name} onChange={(v) => setProfile({ ...profile, name: v })} placeholder="e.g. Priya Sharma" />
            <ProfileInput label="Ghar ka address / flat, gali" value={profile.address} onChange={(v) => setProfile({ ...profile, address: v })} placeholder="House no., street, colony" />
            <ProfileInput label="Landmark" value={profile.landmark} onChange={(v) => setProfile({ ...profile, landmark: v })} placeholder="e.g. Hanuman Mandir ke paas" />
            <div style={{ display: "flex", gap: 10 }}>
              <div style={{ flex: 1 }}>
                <ProfileInput label="Sheher" value={profile.city} onChange={(v) => setProfile({ ...profile, city: v })} placeholder="e.g. Lucknow" />
              </div>
              <div style={{ flex: 1 }}>
                <ProfileInput label="Pincode" value={profile.pincode} onChange={(v) => setProfile({ ...profile, pincode: v.replace(/[^0-9]/g, "").slice(0, 6) })} placeholder="e.g. 226010" />
              </div>
            </div>

            <button
              onClick={submitProfile}
              disabled={!profile.name.trim() || !profile.address.trim()}
              style={{
                width: "100%", padding: "13px 0", borderRadius: 10, border: "none", marginTop: 6,
                background: !profile.name.trim() || !profile.address.trim() ? "#B7C9BE" : COLORS.forest,
                color: "#fff", fontWeight: 700, fontSize: 15,
                cursor: !profile.name.trim() || !profile.address.trim() ? "not-allowed" : "pointer",
              }}
            >
              Profile save karein aur shuru karein
            </button>
            <button
              onClick={() => setStep("role")}
              style={{ width: "100%", padding: "10px 0", borderRadius: 10, border: "none", background: "none", color: "#8A8168", fontSize: 12.5, marginTop: 6, cursor: "pointer" }}
            >
              ← Wapas jayein
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function ProfileInput({ label, value, onChange, placeholder }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <label style={{ fontSize: 12, fontWeight: 600, color: COLORS.ink }}>{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: "100%", marginTop: 5, padding: "10px 12px", borderRadius: 9,
          border: `1px solid ${COLORS.line}`, fontSize: 13.5, outline: "none", boxSizing: "border-box",
        }}
      />
    </div>
  );
}

// ---------------- ADMIN PANEL ----------------
function AdminPanel({ state, actions, onLogout, userName }) {
  const [tab, setTab] = useState("dashboard");
  const nav = [
    { key: "dashboard", label: "Dashboard", icon: Home },
    { key: "products", label: "Products", icon: Package },
    { key: "orders", label: "Orders", icon: ClipboardList },
    { key: "vendors", label: "Vendors", icon: Truck },
    { key: "customers", label: "Customers", icon: Users },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <TopBar title="Annapurna Daily Needs" subtitle={`Namaste, ${userName}`} roleLabel="Admin" roleColor={COLORS.forest} onLogout={onLogout} />
      <div style={{ display: "flex", flex: 1 }} className="anp-body">
        <SideNav items={nav} active={tab} onSelect={setTab} accent={COLORS.forest} />
        <div style={{ flex: 1, padding: 22, background: COLORS.cream, overflowX: "auto" }}>
          {tab === "dashboard" && <AdminDashboard state={state} />}
          {tab === "products" && <AdminProducts state={state} actions={actions} />}
          {tab === "orders" && <AdminOrders state={state} actions={actions} />}
          {tab === "vendors" && <AdminVendors state={state} actions={actions} />}
          {tab === "customers" && <AdminCustomers state={state} />}
        </div>
      </div>
      <BottomNav items={nav} active={tab} onSelect={setTab} accent={COLORS.forest} />
    </div>
  );
}

function AdminDashboard({ state }) {
  const pending = state.orders.filter((o) => o.status === "Placed").length;
  const active = state.orders.filter((o) => !["Delivered"].includes(o.status)).length;
  const revenue = state.orders.reduce((s, o) => s + o.total, 0);
  return (
    <div>
      <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 22 }}>
        <StatCard label="Naye Orders (Placed)" value={pending} color={COLORS.turmeric} />
        <StatCard label="Active Orders" value={active} color={COLORS.tomato} />
        <StatCard label="Total Products" value={state.products.length} color={COLORS.leaf} />
        <StatCard label="Approved Vendors" value={state.vendors.filter((v) => v.status === "Approved").length} color={COLORS.forest} />
        <StatCard label="Total Revenue" value={`₹${revenue}`} color={COLORS.forest} />
      </div>
      <div style={{ fontFamily: "'Baloo 2'", fontSize: 17, fontWeight: 700, color: COLORS.forest, marginBottom: 10 }}>
        Recent Orders
      </div>
      <OrdersTable orders={state.orders.slice(-5).reverse()} />
    </div>
  );
}

function OrdersTable({ orders, renderActions }) {
  return (
    <div style={{ background: "#fff", border: `1px solid ${COLORS.line}`, borderRadius: 14, overflow: "hidden" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13.5 }}>
        <thead>
          <tr style={{ background: COLORS.cream, textAlign: "left" }}>
            <th style={{ padding: "10px 14px" }}>Order</th>
            <th>Customer</th>
            <th>Total</th>
            <th>Status</th>
            {renderActions && <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 && (
            <tr><td colSpan={5} style={{ padding: 20, textAlign: "center", color: "#A6A088" }}>Koi order nahi hai</td></tr>
          )}
          {orders.map((o) => (
            <tr key={o.id} style={{ borderTop: `1px solid ${COLORS.line}` }}>
              <td style={{ padding: "10px 14px", fontWeight: 600 }}>#{o.id}</td>
              <td>{o.customerName}</td>
              <td>₹{o.total}</td>
              <td><Badge text={o.status} color={STATUS_COLOR[o.status]} /></td>
              {renderActions && <td style={{ padding: "8px 14px" }}>{renderActions(o)}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SmallBtn({ children, onClick, color = COLORS.forest, outline }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "6px 12px",
        borderRadius: 8,
        border: outline ? `1px solid ${color}` : "none",
        background: outline ? "#fff" : color,
        color: outline ? color : "#fff",
        fontSize: 12.5,
        fontWeight: 600,
        cursor: "pointer",
        marginRight: 6,
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
      }}
    >
      {children}
    </button>
  );
}

function AdminProducts({ state, actions }) {
  const [form, setForm] = useState({ name: "", category: "Vegetable", price: "", unit: "kg", stock: "", image: null });
  const [editingId, setEditingId] = useState(null);

  const submit = () => {
    if (!form.name || !form.price) return;
    if (editingId) {
      actions.editProduct(editingId, { ...form, price: Number(form.price), stock: Number(form.stock) || 0 });
      setEditingId(null);
    } else {
      actions.addProduct({ ...form, price: Number(form.price), stock: Number(form.stock) || 0 });
    }
    setForm({ name: "", category: "Vegetable", price: "", unit: "kg", stock: "", image: null });
  };

  const startEdit = (p) => {
    setEditingId(p.id);
    setForm({ name: p.name, category: p.category, price: p.price, unit: p.unit, stock: p.stock, image: p.image || null });
  };

  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setForm((f) => ({ ...f, image: reader.result }));
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <div style={{ fontFamily: "'Baloo 2'", fontSize: 17, fontWeight: 700, color: COLORS.forest, marginBottom: 14 }}>
        {editingId ? "Product Edit karein" : "Naya Product Add karein"}
      </div>
      <div style={{ background: "#fff", border: `1px solid ${COLORS.line}`, borderRadius: 14, padding: 16, marginBottom: 22, display: "flex", gap: 10, flexWrap: "wrap", alignItems: "end" }}>
        <div>
          <div style={{ fontSize: 11.5, fontWeight: 600, color: "#8A8168", marginBottom: 4 }}>Product Image</div>
          <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
            <div style={{
              width: 54, height: 54, borderRadius: 10, border: `1.5px dashed ${COLORS.line}`,
              background: form.image ? `url(${form.image}) center/cover no-repeat` : "#fff",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              {!form.image && <Package size={18} color="#B7AF95" />}
            </div>
            <span style={{ fontSize: 12, fontWeight: 700, color: COLORS.forest, border: `1px solid ${COLORS.forest}`, padding: "6px 10px", borderRadius: 8 }}>
              Select Image
            </span>
            <input type="file" accept="image/*" onChange={handleImageSelect} style={{ display: "none" }} />
          </label>
        </div>
        <FieldInput label="Naam" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
        <FieldSelect label="Category" value={form.category} onChange={(v) => setForm({ ...form, category: v })} options={Object.keys(CATEGORY_META)} />
        <FieldInput label="Price (₹)" value={form.price} onChange={(v) => setForm({ ...form, price: v })} type="number" width={100} />
        <FieldInput label="Unit" value={form.unit} onChange={(v) => setForm({ ...form, unit: v })} width={90} />
        <FieldInput label="Stock" value={form.stock} onChange={(v) => setForm({ ...form, stock: v })} type="number" width={90} />
        <SmallBtn onClick={submit} color={COLORS.forest}><Plus size={14} /> {editingId ? "Save" : "Add"}</SmallBtn>
        {editingId && <SmallBtn onClick={() => { setEditingId(null); setForm({ name: "", category: "Vegetable", price: "", unit: "kg", stock: "", image: null }); }} outline><X size={14} /> Cancel</SmallBtn>}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px,1fr))", gap: 12 }}>
        {state.products.map((p) => {
          const meta = CATEGORY_META[p.category];
          const Icon = meta.icon;
          return (
            <div key={p.id} style={{ background: "#fff", border: `1px solid ${COLORS.line}`, borderRadius: 14, padding: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {p.image ? (
                    <img src={p.image} alt={p.name} style={{ width: 26, height: 26, borderRadius: 6, objectFit: "cover" }} />
                  ) : (
                    <Icon size={16} color={meta.color} />
                  )}
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{p.name}</div>
                </div>
              </div>
              <div style={{ fontSize: 12, color: "#8A8168", margin: "6px 0" }}>{p.category} · {p.unit}</div>
              <div style={{ fontWeight: 700, color: COLORS.forest, fontSize: 15 }}>₹{p.price}</div>
              <div style={{ fontSize: 12, color: p.stock < 20 ? COLORS.tomato : "#8A8168" }}>Stock: {p.stock}</div>
              <div style={{ marginTop: 10 }}>
                <SmallBtn onClick={() => startEdit(p)} outline>Edit</SmallBtn>
                <SmallBtn onClick={() => actions.deleteProduct(p.id)} color={COLORS.tomato}><Trash2 size={13} /></SmallBtn>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function FieldInput({ label, value, onChange, type = "text", width = 160 }) {
  return (
    <div style={{ width }}>
      <div style={{ fontSize: 11.5, fontWeight: 600, color: "#8A8168", marginBottom: 4 }}>{label}</div>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ width: "100%", padding: "8px 10px", borderRadius: 8, border: `1px solid ${COLORS.line}`, fontSize: 13, boxSizing: "border-box" }}
      />
    </div>
  );
}

function FieldSelect({ label, value, onChange, options }) {
  return (
    <div style={{ width: 140 }}>
      <div style={{ fontSize: 11.5, fontWeight: 600, color: "#8A8168", marginBottom: 4 }}>{label}</div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ width: "100%", padding: "8px 10px", borderRadius: 8, border: `1px solid ${COLORS.line}`, fontSize: 13 }}
      >
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

function buildInvoiceHtml(order) {
  const itemsHtml = (order.items || []).map((i) => `
    <tr>
      <td style="padding:6px 4px;border-bottom:1px solid #eee;">${i.name}</td>
      <td style="padding:6px 4px;border-bottom:1px solid #eee;text-align:center;">${i.qty} ${i.unit || ""}</td>
      <td style="padding:6px 4px;border-bottom:1px solid #eee;text-align:right;">₹${i.price}</td>
      <td style="padding:6px 4px;border-bottom:1px solid #eee;text-align:right;">₹${i.price * i.qty}</td>
    </tr>`).join("");
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<title>Invoice #${order.id}</title>
<style>
  body { font-family: Arial, sans-serif; padding: 24px; color:#222; max-width:480px; margin:0 auto; }
  h2 { margin:0; }
  table { width:100%; border-collapse:collapse; margin-top:14px; }
  th { text-align:left; font-size:12px; color:#777; border-bottom:1px solid #ccc; padding-bottom:6px; }
  .muted { color:#777; font-size:12px; }
  .center{text-align:center;}
  .right{text-align:right;}
  .print-btn { margin-top:20px; padding:10px 18px; background:#1F4D3A; color:#fff; border:none; border-radius:8px; font-size:14px; cursor:pointer; }
  @media print { .print-btn { display:none; } }
</style>
</head>
<body>
  <div style="text-align:center;margin-bottom:14px;">
    <h2>Annapurna Daily Needs</h2>
    <div class="muted">Order Invoice</div>
  </div>
  <div>Order ID: <b>#${order.id}</b></div>
  <div class="muted">Date: ${order.date}</div>
  <div style="margin-top:8px;">Customer: <b>${order.customerName}</b></div>
  <div class="muted">Phone: ${order.customerPhone || "-"}</div>
  <div class="muted">Address: ${order.address || "-"}</div>
  <table>
    <thead><tr><th>Item</th><th class="center">Qty</th><th class="right">Price</th><th class="right">Amount</th></tr></thead>
    <tbody>${itemsHtml || `<tr><td colspan="4" class="muted" style="padding:8px 0;">Item details available nahi</td></tr>`}</tbody>
  </table>
  <div class="right" style="margin-top:12px;font-weight:bold;font-size:15px;">Total: ₹${order.total}</div>
  <div style="text-align:center;margin-top:20px;" class="muted">Annapurna Daily Needs — Thank you!</div>
  <div style="text-align:center;">
    <button class="print-btn" onclick="window.print()">🖨 Print this bill</button>
  </div>
</body>
</html>`;
}

function downloadInvoice(order) {
  const html = buildInvoiceHtml(order);
  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `invoice-${order.id}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 3000);
}

function AdminOrders({ state, actions }) {
  const byCustomer = {};
  [...state.orders].reverse().forEach((o) => {
    if (!byCustomer[o.customerName]) byCustomer[o.customerName] = [];
    byCustomer[o.customerName].push(o);
  });
  const names = Object.keys(byCustomer);

  return (
    <div>
      <div style={{ fontFamily: "'Baloo 2'", fontSize: 17, fontWeight: 700, color: COLORS.forest, marginBottom: 4 }}>Sabhi Orders</div>
      <div style={{ fontSize: 12.5, color: "#8A8168", marginBottom: 16 }}>Har customer ke sabhi orders, poore items ke saath</div>

      {names.length === 0 && <div style={{ textAlign: "center", padding: 40, color: "#A6A088" }}>Abhi koi order nahi hai.</div>}

      {names.map((name) => {
        const customerOrders = byCustomer[name];
        const info = customerOrders[0];
        return (
          <div key={name} style={{ marginBottom: 26 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <div style={{ fontFamily: "'Baloo 2'", fontWeight: 700, fontSize: 15, color: COLORS.forest }}>{name}</div>
              <Badge text={`${customerOrders.length} order${customerOrders.length > 1 ? "s" : ""}`} color={COLORS.leaf} />
              {info.customerPhone && <span style={{ fontSize: 12, color: "#8A8168" }}>· {info.customerPhone}</span>}
            </div>
            {customerOrders.map((o) => (
              <AdminOrderCard key={o.id} order={o} state={state} actions={actions} />
            ))}
          </div>
        );
      })}
    </div>
  );
}

function AdminOrderCard({ order: o, state, actions }) {
  const canPrint = o.status !== "Placed";
  return (
    <div style={{ background: "#fff", border: `1px solid ${COLORS.line}`, borderRadius: 14, padding: 16, marginBottom: 10, maxWidth: 560 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
        <div style={{ fontWeight: 800 }}>Order #{o.id}</div>
        <Badge text={o.status} color={STATUS_COLOR[o.status]} />
      </div>
      <div style={{ fontSize: 12, color: "#8A8168", marginBottom: 10 }}>{o.date} {o.address ? `· ${o.address}` : ""}</div>

      <div style={{ border: `1px solid ${COLORS.line}`, borderRadius: 10, overflow: "hidden", marginBottom: 10 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12.5 }}>
          <thead>
            <tr style={{ background: COLORS.cream, textAlign: "left" }}>
              <th style={{ padding: "6px 10px" }}>Item</th><th>Qty</th><th style={{ textAlign: "right", paddingRight: 10 }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {(o.items && o.items.length > 0) ? o.items.map((i) => (
              <tr key={i.productId} style={{ borderTop: `1px solid ${COLORS.line}` }}>
                <td style={{ padding: "6px 10px" }}>{i.name}</td>
                <td>{i.qty} {i.unit}</td>
                <td style={{ textAlign: "right", paddingRight: 10 }}>₹{i.price * i.qty}</td>
              </tr>
            )) : (
              <tr><td colSpan={3} style={{ padding: "8px 10px", color: "#A6A088" }}>Item details available nahi</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontWeight: 800, color: COLORS.forest, fontSize: 15 }}>Total: ₹{o.total}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {o.status === "Placed" && <SmallBtn onClick={() => actions.confirmOrder(o.id)}><Check size={13} /> Confirm</SmallBtn>}
          {o.status === "Confirmed" && (
            <AssignVendorButton vendors={state.vendors.filter((v) => v.status === "Approved")} onAssign={(vid) => actions.assignVendor(o.id, vid)} />
          )}
          {["Assigned", "Out for Delivery"].includes(o.status) && (
            <span style={{ fontSize: 12, color: "#8A8168" }}>Vendor: {state.vendors.find((v) => v.id === o.vendorId)?.name || "-"}</span>
          )}
          {o.status === "Delivered" && <span style={{ fontSize: 12, color: COLORS.forest, fontWeight: 600 }}>✓ Complete</span>}
          <SmallBtn onClick={() => canPrint && downloadInvoice(o)} outline={!canPrint} color={canPrint ? COLORS.forest : "#B7AF95"}>
            🖨 Print / Download Bill
          </SmallBtn>
        </div>
      </div>
    </div>
  );
}

function AssignVendorButton({ vendors, onAssign }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <SmallBtn onClick={() => setOpen(!open)} color={COLORS.forest}>Vendor Assign</SmallBtn>
      {open && (
        <div style={{ position: "absolute", top: "110%", right: 0, background: "#fff", border: `1px solid ${COLORS.line}`, borderRadius: 10, boxShadow: "0 8px 20px rgba(0,0,0,0.12)", zIndex: 10, minWidth: 160 }}>
          {vendors.map((v) => (
            <div key={v.id} onClick={() => { onAssign(v.id); setOpen(false); }} style={{ padding: "8px 12px", fontSize: 12.5, cursor: "pointer", borderBottom: `1px solid ${COLORS.line}` }}>
              {v.name}
            </div>
          ))}
          {vendors.length === 0 && <div style={{ padding: "8px 12px", fontSize: 12, color: "#A6A088" }}>Koi approved vendor nahi</div>}
        </div>
      )}
    </div>
  );
}

function AdminVendors({ state, actions }) {
  const [form, setForm] = useState({ name: "", phone: "", area: "" });

  const submit = () => {
    if (!form.name.trim() || !form.phone.trim()) return;
    actions.addVendor({ name: form.name.trim(), phone: form.phone.trim(), area: form.area.trim() || "-" });
    setForm({ name: "", phone: "", area: "" });
  };

  return (
    <div>
      <div style={{ fontFamily: "'Baloo 2'", fontSize: 17, fontWeight: 700, color: COLORS.forest, marginBottom: 14 }}>Naya Vendor Jodein</div>
      <div style={{ background: "#fff", border: `1px solid ${COLORS.line}`, borderRadius: 14, padding: 16, marginBottom: 22, display: "flex", gap: 10, flexWrap: "wrap", alignItems: "end" }}>
        <FieldInput label="Vendor / Dukaan ka naam" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
        <FieldInput label="Phone" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} width={140} />
        <FieldInput label="Area" value={form.area} onChange={(v) => setForm({ ...form, area: v })} width={140} />
        <SmallBtn onClick={submit} color={COLORS.forest}><Plus size={14} /> Vendor Add karein</SmallBtn>
      </div>

      <div style={{ fontFamily: "'Baloo 2'", fontSize: 17, fontWeight: 700, color: COLORS.forest, marginBottom: 14 }}>Vendors</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px,1fr))", gap: 12 }}>
        {state.vendors.map((v) => (
          <div key={v.id} style={{ background: "#fff", border: `1px solid ${COLORS.line}`, borderRadius: 14, padding: 14 }}>
            <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{v.name}</div>
            <div style={{ fontSize: 12.5, color: "#8A8168", display: "flex", alignItems: "center", gap: 5 }}><Phone size={12} /> {v.phone}</div>
            <div style={{ fontSize: 12.5, color: "#8A8168", display: "flex", alignItems: "center", gap: 5, margin: "3px 0 10px" }}><MapPin size={12} /> {v.area}</div>
            <Badge text={v.status} color={v.status === "Approved" ? COLORS.leaf : COLORS.turmeric} />
            {v.status === "Pending" && (
              <div style={{ marginTop: 10 }}>
                <SmallBtn onClick={() => actions.approveVendor(v.id)}><UserCheck size={13} /> Approve</SmallBtn>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminCustomers({ state }) {
  return (
    <div>
      <div style={{ fontFamily: "'Baloo 2'", fontSize: 17, fontWeight: 700, color: COLORS.forest, marginBottom: 14 }}>Customers</div>
      <div style={{ background: "#fff", border: `1px solid ${COLORS.line}`, borderRadius: 14, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13.5 }}>
          <thead>
            <tr style={{ background: COLORS.cream, textAlign: "left" }}>
              <th style={{ padding: "10px 14px" }}>Naam</th><th>Phone</th><th>Address</th><th>Total Orders</th>
            </tr>
          </thead>
          <tbody>
            {state.customers.map((c) => (
              <tr key={c.id} style={{ borderTop: `1px solid ${COLORS.line}` }}>
                <td style={{ padding: "10px 14px", fontWeight: 600 }}>{c.name}</td>
                <td>{c.phone}</td>
                <td style={{ maxWidth: 220 }}>{c.address || "-"}</td>
                <td>{c.orders}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ---------------- CUSTOMER PANEL (quick-commerce style) ----------------
function CustomerPanel({ state, actions, onLogout, userName, profile }) {
  const [tab, setTab] = useState("browse");
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const nav = [
    { key: "browse", label: "Browse", icon: Home },
    { key: "cart", label: "Cart", icon: ShoppingCart },
    { key: "myorders", label: "My Orders", icon: ClipboardList },
  ];
  const myOrders = state.orders.filter((o) => o.customerName === userName);
  const cartItems = state.cart.map((ci) => ({ ...ci, product: state.products.find((p) => p.id === ci.productId) })).filter((i) => i.product);
  const cartCount = state.cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cartItems.reduce((s, i) => s + i.product.price * i.qty, 0);
  const shortAddress = [profile?.address, profile?.landmark].filter(Boolean).join(", ");

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <div style={{ background: COLORS.forest, color: "#fff", padding: "14px 20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "'Baloo 2'", fontWeight: 800, fontSize: 20 }}>
              <Leaf size={20} color={COLORS.turmeric} /> Annapurna Daily Needs
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12.5, opacity: 0.85, marginTop: 3 }}>
              <MapPin size={12} /> {shortAddress || `Deliver kar rahe hain — ${userName}`}
            </div>
          </div>
          <button onClick={onLogout} style={{ background: "rgba(255,255,255,0.14)", border: "none", borderRadius: 8, color: "#fff", padding: "6px 12px", fontSize: 12.5, display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
            <LogOut size={13} /> Logout
          </button>
        </div>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: COLORS.turmeric, color: COLORS.forest, borderRadius: 999, padding: "5px 12px", fontSize: 12.5, fontWeight: 800, marginTop: 12 }}>
          <Clock size={13} /> 12 minute mein delivery
        </div>
      </div>

      <div style={{ display: "flex", flex: 1 }} className="anp-body">
        <SideNav
          items={nav.map((n) => n.key === "cart" ? { ...n, label: `Cart (${cartCount})` } : n)}
          active={tab} onSelect={setTab} accent={COLORS.tomato}
        />
        <div style={{ flex: 1, padding: 22, paddingBottom: cartCount > 0 && tab === "browse" ? 90 : 22, background: COLORS.cream }}>
          {tab === "browse" && (
            <CustomerBrowse
              products={state.products}
              category={category} setCategory={setCategory}
              search={search} setSearch={setSearch}
              cart={state.cart}
              onAdd={actions.addToCart}
              onQty={actions.updateCartQty}
            />
          )}
          {tab === "cart" && (
            <CustomerCart cart={state.cart} products={state.products} actions={actions} userName={userName} phone={profile?.phone} onOrdered={() => setTab("myorders")} />
          )}
          {tab === "myorders" && <CustomerOrders orders={myOrders} />}
        </div>
      </div>

      {cartCount > 0 && tab === "browse" && (
        <button
          onClick={() => setTab("cart")}
          style={{
            position: "fixed", left: "50%", transform: "translateX(-50%)", bottom: 70,
            width: "min(92%, 480px)", background: COLORS.forest, color: "#fff", border: "none",
            borderRadius: 12, padding: "13px 18px", display: "flex", justifyContent: "space-between",
            alignItems: "center", boxShadow: "0 10px 24px rgba(0,0,0,0.25)", cursor: "pointer", zIndex: 20,
          }}
        >
          <span style={{ fontWeight: 700, fontSize: 13.5 }}>{cartCount} item{cartCount > 1 ? "s" : ""} · ₹{cartTotal}</span>
          <span style={{ fontWeight: 800, fontSize: 13.5, display: "flex", alignItems: "center", gap: 4 }}>View Cart <ShoppingCart size={15} /></span>
        </button>
      )}

      <BottomNav items={nav.map((n) => n.key === "cart" ? { ...n, label: `Cart (${cartCount})` } : n)} active={tab} onSelect={setTab} accent={COLORS.tomato} />
    </div>
  );
}

function CustomerBrowse({ products, category, setCategory, search, setSearch, cart, onAdd, onQty }) {
  const cats = ["All", ...Object.keys(CATEGORY_META)];
  const filtered = products.filter((p) => {
    const matchCat = category === "All" || p.category === category;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });
  const qtyOf = (id) => cart.find((c) => c.productId === id)?.qty || 0;

  return (
    <div>
      <div style={{ position: "relative", marginBottom: 16 }}>
        <Search size={16} color="#A6A088" style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }} />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Sabzi, fal ya grocery dhundein..."
          style={{ width: "100%", padding: "11px 14px 11px 38px", borderRadius: 12, border: `1px solid ${COLORS.line}`, fontSize: 13.5, boxSizing: "border-box", background: "#fff" }}
        />
      </div>

      <div style={{ display: "flex", gap: 16, marginBottom: 20, overflowX: "auto", paddingBottom: 4 }}>
        {cats.map((c) => {
          const meta = CATEGORY_META[c];
          const Icon = meta ? meta.icon : Zap;
          const color = meta ? meta.color : COLORS.forest;
          const isActive = category === c;
          return (
            <button
              key={c}
              onClick={() => setCategory(c)}
              style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, flexShrink: 0 }}
            >
              <div style={{
                width: 54, height: 54, borderRadius: "50%",
                background: isActive ? color : color + "1A",
                border: isActive ? `2px solid ${color}` : "1px solid transparent",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Icon size={22} color={isActive ? "#fff" : color} />
              </div>
              <span style={{ fontSize: 11.5, fontWeight: isActive ? 700 : 500, color: isActive ? color : COLORS.ink }}>{c}</span>
            </button>
          );
        })}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(170px,1fr))", gap: 14 }}>
        {filtered.map((p) => {
          const meta = CATEGORY_META[p.category];
          const Icon = meta.icon;
          const qty = qtyOf(p.id);
          return (
            <div key={p.id} style={{ background: "#fff", border: `1px solid ${COLORS.line}`, borderRadius: 14, padding: 14, position: "relative" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 10.5, fontWeight: 700, color: COLORS.leaf, marginBottom: 8 }}>
                <Clock size={11} /> 12 MIN
              </div>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: meta.color + "1A", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10, overflow: "hidden" }}>
                {p.image ? (
                  <img src={p.image} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  <Icon size={21} color={meta.color} />
                )}
              </div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>{p.name}</div>
              <div style={{ fontSize: 11.5, color: "#8A8168", margin: "3px 0 10px" }}>per {p.unit}</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontWeight: 800, color: COLORS.forest, fontSize: 15 }}>₹{p.price}</div>
                {p.stock === 0 ? (
                  <span style={{ fontSize: 11, color: COLORS.tomato, fontWeight: 700 }}>Out of stock</span>
                ) : qty === 0 ? (
                  <button
                    onClick={() => onAdd(p.id)}
                    style={{ padding: "6px 14px", borderRadius: 8, border: `1.5px solid ${COLORS.tomato}`, background: "#fff", color: COLORS.tomato, fontSize: 12, fontWeight: 800, cursor: "pointer" }}
                  >
                    ADD
                  </button>
                ) : (
                  <div style={{ display: "flex", alignItems: "center", gap: 8, background: COLORS.tomato, borderRadius: 8, padding: "4px 8px" }}>
                    <button onClick={() => onQty(p.id, qty - 1)} style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", display: "flex" }}><Minus size={13} /></button>
                    <span style={{ color: "#fff", fontWeight: 800, fontSize: 12.5 }}>{qty}</span>
                    <button onClick={() => onAdd(p.id)} style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", display: "flex" }}><Plus size={13} /></button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div style={{ gridColumn: "1/-1", textAlign: "center", padding: 40, color: "#A6A088" }}>Kuch nahi mila — dusra keyword try karein.</div>
        )}
      </div>
    </div>
  );
}

function CustomerCart({ cart, products, actions, userName, phone, onOrdered }) {
  const items = cart.map((ci) => ({ ...ci, product: products.find((p) => p.id === ci.productId) })).filter((i) => i.product);
  const total = items.reduce((s, i) => s + i.product.price * i.qty, 0);

  if (items.length === 0) {
    return <div style={{ textAlign: "center", padding: 60, color: "#A6A088" }}>Aapka cart khali hai — Browse se product add karein.</div>;
  }

  return (
    <div style={{ maxWidth: 520 }}>
      <div style={{ fontFamily: "'Baloo 2'", fontSize: 17, fontWeight: 700, color: COLORS.forest, marginBottom: 14 }}>Cart</div>
      {items.map((i) => (
        <div key={i.productId} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#fff", border: `1px solid ${COLORS.line}`, borderRadius: 12, padding: "12px 14px", marginBottom: 8 }}>
          <div>
            <div style={{ fontWeight: 600, fontSize: 14 }}>{i.product.name}</div>
            <div style={{ fontSize: 12, color: "#8A8168" }}>₹{i.product.price} / {i.product.unit}</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button onClick={() => actions.updateCartQty(i.productId, i.qty - 1)} style={{ ...circleBtnStyle }}><Minus size={13} /></button>
            <span style={{ fontWeight: 700, width: 20, textAlign: "center" }}>{i.qty}</span>
            <button onClick={() => actions.updateCartQty(i.productId, i.qty + 1)} style={{ ...circleBtnStyle }}><Plus size={13} /></button>
          </div>
        </div>
      ))}
      <div style={{ display: "flex", justifyContent: "space-between", padding: "14px 4px", fontWeight: 700, fontSize: 16 }}>
        <span>Total</span><span style={{ color: COLORS.forest }}>₹{total}</span>
      </div>
      <button
        onClick={() => {
          actions.placeOrder(userName, total, phone, items.map((i) => ({
            productId: i.productId, name: i.product.name, price: i.product.price, unit: i.product.unit, qty: i.qty,
          })));
          onOrdered();
        }}
        style={{ width: "100%", padding: "13px 0", borderRadius: 10, border: "none", background: COLORS.forest, color: "#fff", fontWeight: 700, fontSize: 15, cursor: "pointer" }}
      >
        Order Confirm karein
      </button>
    </div>
  );
}

const circleBtnStyle = {
  width: 26, height: 26, borderRadius: "50%", border: `1px solid ${COLORS.line}`, background: "#fff", cursor: "pointer",
  display: "flex", alignItems: "center", justifyContent: "center",
};

function CustomerOrders({ orders }) {
  if (orders.length === 0) {
    return <div style={{ textAlign: "center", padding: 60, color: "#A6A088" }}>Abhi tak koi order nahi kiya.</div>;
  }
  return (
    <div style={{ maxWidth: 560 }}>
      <div style={{ fontFamily: "'Baloo 2'", fontSize: 17, fontWeight: 700, color: COLORS.forest, marginBottom: 14 }}>Mere Orders</div>
      {[...orders].reverse().map((o) => (
        <div key={o.id} style={{ background: "#fff", border: `1px solid ${COLORS.line}`, borderRadius: 12, padding: 16, marginBottom: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
            <div style={{ fontWeight: 700 }}>Order #{o.id}</div>
            <div style={{ fontWeight: 700, color: COLORS.forest }}>₹{o.total}</div>
          </div>
          <StatusTracker status={o.status} />
        </div>
      ))}
    </div>
  );
}

function StatusTracker({ status }) {
  const idx = STATUS_FLOW.indexOf(status);
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {STATUS_FLOW.map((s, i) => (
        <React.Fragment key={s}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: 60 }}>
            <div style={{
              width: 18, height: 18, borderRadius: "50%",
              background: i <= idx ? STATUS_COLOR[status] : COLORS.line,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              {i <= idx && <Check size={11} color="#fff" />}
            </div>
            <div style={{ fontSize: 10, textAlign: "center", marginTop: 4, color: i <= idx ? COLORS.ink : "#B8B096", fontWeight: i === idx ? 700 : 500 }}>{s}</div>
          </div>
          {i < STATUS_FLOW.length - 1 && <div style={{ flex: 1, height: 2, background: i < idx ? STATUS_COLOR[status] : COLORS.line, marginBottom: 16 }} />}
        </React.Fragment>
      ))}
    </div>
  );
}

// ---------------- DELIVERY PARTNER PANEL (Vendor login) ----------------
function VendorPanel({ state, actions, onLogout, userName }) {
  const [tab, setTab] = useState("assigned");
  const nav = [
    { key: "assigned", label: "Deliveries", icon: Truck },
    { key: "history", label: "Earnings", icon: IndianRupee },
  ];
  const myOrders = state.orders.filter((o) => o.vendorAssignedTo === userName || (o.vendorId && state.vendors.find(v => v.id === o.vendorId)?.name === userName));
  const active = myOrders.filter((o) => o.status !== "Delivered");
  const done = myOrders.filter((o) => o.status === "Delivered");
  const earnings = done.length * 25;

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <div style={{ background: COLORS.forest, color: "#fff", padding: "14px 20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "'Baloo 2'", fontWeight: 800, fontSize: 19 }}>
              <Truck size={19} color={COLORS.turmeric} /> Delivery Partner
            </div>
            <div style={{ fontSize: 12.5, opacity: 0.85, marginTop: 3 }}>Namaste, {userName}</div>
          </div>
          <button onClick={onLogout} style={{ background: "rgba(255,255,255,0.14)", border: "none", borderRadius: 8, color: "#fff", padding: "6px 12px", fontSize: 12.5, display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
            <LogOut size={13} /> Logout
          </button>
        </div>
        <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
          <div style={{ background: "rgba(255,255,255,0.12)", borderRadius: 10, padding: "8px 14px" }}>
            <div style={{ fontSize: 10.5, opacity: 0.8 }}>Active</div>
            <div style={{ fontWeight: 800, fontSize: 16 }}>{active.length}</div>
          </div>
          <div style={{ background: "rgba(255,255,255,0.12)", borderRadius: 10, padding: "8px 14px" }}>
            <div style={{ fontSize: 10.5, opacity: 0.8 }}>Delivered aaj</div>
            <div style={{ fontWeight: 800, fontSize: 16 }}>{done.length}</div>
          </div>
          <div style={{ background: COLORS.turmeric, color: COLORS.forest, borderRadius: 10, padding: "8px 14px" }}>
            <div style={{ fontSize: 10.5, opacity: 0.85 }}>Earnings</div>
            <div style={{ fontWeight: 800, fontSize: 16 }}>₹{earnings}</div>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flex: 1 }} className="anp-body">
        <SideNav items={nav} active={tab} onSelect={setTab} accent={COLORS.turmeric} />
        <div style={{ flex: 1, padding: 22, background: COLORS.cream }}>
          <div style={{ fontSize: 12.5, color: "#8A8168", marginBottom: 14, background: "#fff", border: `1px solid ${COLORS.line}`, borderRadius: 10, padding: 10 }}>
            Demo note: Admin panel mein jis vendor-naam ko order assign karein, usi naam se yahan login karein taaki order dikhe.
          </div>

          {tab === "assigned" && (
            <>
              {active.length === 0 && <div style={{ textAlign: "center", padding: 40, color: "#A6A088" }}>Abhi koi delivery assign nahi hui.</div>}
              {active.map((o) => (
                <div key={o.id} style={{ background: "#fff", border: `1px solid ${COLORS.line}`, borderRadius: 14, padding: 18, marginBottom: 12, maxWidth: 460 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <div style={{ fontWeight: 800, fontSize: 15 }}>Order #{o.id}</div>
                    <Badge text={o.status} color={STATUS_COLOR[o.status]} />
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13.5, marginBottom: 4 }}>
                    <Users size={14} color="#8A8168" /> {o.customerName}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13.5, marginBottom: 4 }}>
                    <Navigation size={14} color="#8A8168" /> {o.address || "Address available nahi"}
                  </div>
                  {o.customerPhone && (
                    <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13.5, marginBottom: 4 }}>
                      <Phone size={14} color="#8A8168" /> {o.customerPhone}
                    </div>
                  )}
                  <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13.5, marginBottom: 14 }}>
                    <IndianRupee size={14} color="#8A8168" /> Order value: ₹{o.total} · Payout: ₹25
                  </div>
                  {o.status === "Assigned" && (
                    <button onClick={() => actions.markOutForDelivery(o.id)} style={{ width: "100%", padding: "11px 0", borderRadius: 10, border: "none", background: COLORS.tomato, color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                      <Truck size={15} /> Pickup ho gaya — Out for Delivery
                    </button>
                  )}
                  {o.status === "Out for Delivery" && (
                    <button onClick={() => actions.markDelivered(o.id)} style={{ width: "100%", padding: "11px 0", borderRadius: 10, border: "none", background: COLORS.forest, color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                      <Check size={15} /> Delivered confirm karein
                    </button>
                  )}
                </div>
              ))}
            </>
          )}

          {tab === "history" && (
            <div style={{ maxWidth: 460 }}>
              <div style={{ background: "#fff", border: `1px solid ${COLORS.line}`, borderRadius: 14, padding: 18, marginBottom: 14 }}>
                <div style={{ fontSize: 12.5, color: "#8A8168", marginBottom: 4 }}>Aaj ki total kamai</div>
                <div style={{ fontFamily: "'Baloo 2'", fontSize: 28, fontWeight: 800, color: COLORS.forest }}>₹{earnings}</div>
                <div style={{ fontSize: 12, color: "#8A8168", marginTop: 2 }}>{done.length} delivery × ₹25</div>
              </div>
              {done.length === 0 && <div style={{ textAlign: "center", padding: 30, color: "#A6A088" }}>Abhi koi delivery complete nahi hui.</div>}
              {done.map((o) => (
                <div key={o.id} style={{ display: "flex", justifyContent: "space-between", background: "#fff", border: `1px solid ${COLORS.line}`, borderRadius: 12, padding: "12px 16px", marginBottom: 8 }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 13.5 }}>Order #{o.id}</div>
                    <div style={{ fontSize: 12, color: "#8A8168" }}>{o.customerName}</div>
                  </div>
                  <div style={{ fontWeight: 700, color: COLORS.forest }}>+₹25</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <BottomNav items={nav} active={tab} onSelect={setTab} accent={COLORS.turmeric} />
    </div>
  );
}

// ---------------- ROOT APP ----------------
export default function App() {
  const [session, setSession] = useState(null); // { role, name }
  const [products, setProducts] = useState(initialProducts);
  const [vendors, setVendors] = useState(initialVendors);
  const [customers, setCustomers] = useState(initialCustomers);
  const [orders, setOrders] = useState([]);
  const [cart, setCart] = useState([]);

  const state = { products, vendors, customers, orders, cart };

  const actions = {
    addProduct: (p) => setProducts((prev) => [...prev, { ...p, id: nextId("p") }]),
    editProduct: (id, patch) => setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p))),
    deleteProduct: (id) => setProducts((prev) => prev.filter((p) => p.id !== id)),

    approveVendor: (id) => setVendors((prev) => prev.map((v) => (v.id === id ? { ...v, status: "Approved" } : v))),
    addVendor: (v) => setVendors((prev) => [...prev, { ...v, id: nextId("v"), status: "Approved" }]),

    confirmOrder: (id) => setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status: "Confirmed" } : o))),
    assignVendor: (id, vendorId) => setOrders((prev) => prev.map((o) => {
      if (o.id !== id) return o;
      const vendor = vendors.find((v) => v.id === vendorId);
      return { ...o, status: "Assigned", vendorId, vendorAssignedTo: vendor?.name };
    })),
    markOutForDelivery: (id) => setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status: "Out for Delivery" } : o))),
    markDelivered: (id) => setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status: "Delivered" } : o))),

    addToCart: (productId) => setCart((prev) => {
      const existing = prev.find((i) => i.productId === productId);
      if (existing) return prev.map((i) => (i.productId === productId ? { ...i, qty: i.qty + 1 } : i));
      return [...prev, { productId, qty: 1 }];
    }),
    updateCartQty: (productId, qty) => setCart((prev) => {
      if (qty <= 0) return prev.filter((i) => i.productId !== productId);
      return prev.map((i) => (i.productId === productId ? { ...i, qty } : i));
    }),
    placeOrder: (customerName, total, phone, items) => {
      const cust = customers.find((c) => c.phone === phone) || customers.find((c) => c.name === customerName);
      setOrders((prev) => [...prev, {
        id: nextId("ORD"), customerName, customerPhone: phone || cust?.phone || "",
        address: cust?.address ? [cust.address, cust.landmark].filter(Boolean).join(", ") : "",
        items: items || [],
        total, status: "Placed", date: new Date().toISOString().slice(0, 10),
      }]);
      setCustomers((prev) => {
        const exists = prev.find((c) => c.phone === phone || c.name === customerName);
        if (exists) return prev.map((c) => (c === exists ? { ...c, orders: c.orders + 1 } : c));
        return [...prev, { id: nextId("c"), name: customerName, phone: phone || "-", orders: 1 }];
      });
      setCart([]);
    },
    registerCustomer: (profile) => setCustomers((prev) => {
      const exists = prev.find((c) => c.phone === profile.phone);
      if (exists) return prev.map((c) => (c.phone === profile.phone ? { ...c, ...profile, orders: c.orders } : c));
      return [...prev, { id: nextId("c"), ...profile, orders: 0 }];
    }),
  };

  const handleLogin = (role, profile) => {
    setSession({ role, ...profile });
    if (role === "customer") actions.registerCustomer(profile);
  };
  const handleLogout = () => setSession(null);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", color: COLORS.ink, background: COLORS.cream, minHeight: "100vh" }}>
      <style>{`
        ${FONT_IMPORT}
        * { box-sizing: border-box; }
        table th { font-size: 11.5px; color: #8A8168; padding: 10px 14px; }
        @media (max-width: 760px) {
          .anp-sidenav { display: none; }
          .anp-bottomnav { display: flex !important; }
          .anp-body { flex-direction: column; }
        }
      `}</style>

      {!session && <LoginScreen onLogin={handleLogin} />}
      {session?.role === "admin" && <AdminPanel state={state} actions={actions} onLogout={handleLogout} userName={session.name} />}
      {session?.role === "customer" && <CustomerPanel state={state} actions={actions} onLogout={handleLogout} userName={session.name} profile={session} />}
      {session?.role === "vendor" && <VendorPanel state={state} actions={actions} onLogout={handleLogout} userName={session.name} />}
    </div>
  );
}
