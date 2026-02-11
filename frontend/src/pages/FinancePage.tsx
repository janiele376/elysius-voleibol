
import React, { useEffect, useState } from 'react';
import { User, Payment, Role } from '../types';
import { api } from '../services/api';

const FinancePage: React.FC<{ user: User }> = ({ user }) => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [qrData, setQrData] = useState<{ qrCode: string, pixCopyPaste: string } | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [loading, setLoading] = useState(true);
  const [copying, setCopying] = useState(false);

  useEffect(() => {
    loadPayments();
  }, []);

  const loadPayments = async () => {
    setLoading(true);
    try {
      const data = await api.getPayments(user.id);
      setPayments(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleShowQR = async (payment: Payment) => {
    setSelectedPayment(payment);
    const data = await api.getPaymentQRCode(payment.id);
    setQrData(data);
  };

  const handleCopyPix = () => {
    if (qrData) {
      navigator.clipboard.writeText(qrData.pixCopyPaste);
      setCopying(true);
      setTimeout(() => setCopying(false), 2000);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PAGO': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'ATRASADO': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-amber-100 text-amber-700 border-amber-200';
    }
  };

  const isCoach = user.role === Role.TREINADOR;

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-emerald-950 uppercase tracking-tighter">Setor Financeiro</h1>
          <p className="text-emerald-700 font-medium">
            {isCoach ? 'Auditoria completa de mensalidades.' : 'Mantenha seu cadastro em dia para garantir sua vaga.'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-emerald-100 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-emerald-50 text-emerald-800 text-xs font-black uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">Mês/Ano</th>
                  <th className="px-6 py-4">Vencimento</th>
                  <th className="px-6 py-4">Valor Bruto</th>
                  <th className="px-6 py-4">Status</th>
                  {!isCoach && <th className="px-6 py-4">Ação</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-50">
                {payments.map(p => (
                  <tr key={p.id} className="hover:bg-emerald-50/30 transition">
                    <td className="px-6 py-4 font-black text-emerald-950">{String(p.month).padStart(2, '0')}/{p.year}</td>
                    <td className="px-6 py-4 text-emerald-600 font-medium">{new Date(p.dueDate).toLocaleDateString('pt-BR')}</td>
                    <td className="px-6 py-4 font-black text-emerald-900">R$ {p.amount.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black border uppercase tracking-widest ${getStatusColor(p.status)}`}>
                        {p.status}
                      </span>
                    </td>
                    {!isCoach && (
                      <td className="px-6 py-4">
                        {p.status !== 'PAGO' && (
                          <button 
                            onClick={() => handleShowQR(p)}
                            className="bg-emerald-800 text-white px-3 py-1.5 rounded-lg hover:bg-emerald-900 font-bold text-xs flex items-center gap-2 transition shadow-md"
                          >
                            <i className="fas fa-qrcode"></i> GERAR PIX
                          </button>
                        )}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
            {loading && <div className="p-8 text-center text-emerald-600"><i className="fas fa-spinner fa-spin"></i></div>}
          </div>
        </div>

        <div>
          {qrData && selectedPayment ? (
            <div className="bg-white p-6 rounded-2xl shadow-xl border-2 border-emerald-100 sticky top-24 animate-slideDown">
              <h3 className="text-center font-black text-emerald-950 mb-4 uppercase tracking-tighter flex items-center justify-center gap-2">
                <i className="fas fa-bolt text-amber-500"></i> Pagamento Elysius
              </h3>
              <div className="flex justify-center mb-4 bg-emerald-50 p-4 rounded-2xl border border-emerald-100">
                <img src={qrData.qrCode} alt="QR Code PIX" className="w-48 h-48" />
              </div>
              <div className="text-center space-y-2 mb-4">
                <p className="text-sm text-emerald-600 font-medium">Ref. <b>{selectedPayment.month}/{selectedPayment.year}</b></p>
                <p className="text-2xl font-black text-emerald-900 italic tracking-widest">R$ {selectedPayment.amount.toFixed(2)}</p>
              </div>
              
              <button 
                onClick={handleCopyPix}
                className={`w-full mb-2 py-2.5 rounded-xl font-bold transition uppercase text-xs tracking-widest flex items-center justify-center gap-2 ${copying ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-500 text-emerald-950 hover:bg-amber-400'}`}
              >
                <i className={`fas ${copying ? 'fa-check' : 'fa-copy'}`}></i>
                {copying ? 'Copiado!' : 'Pix Copia e Cola'}
              </button>

              <button 
                onClick={() => { setQrData(null); setSelectedPayment(null); }}
                className="w-full py-2.5 border-2 border-emerald-100 rounded-xl text-emerald-700 hover:bg-emerald-50 font-bold transition uppercase text-xs tracking-widest"
              >
                Voltar
              </button>
            </div>
          ) : (
            <div className="bg-emerald-900 p-8 rounded-2xl border border-emerald-800 flex flex-col items-center justify-center text-center space-y-4 shadow-lg text-white">
              <div className="bg-emerald-800 p-4 rounded-full border border-emerald-700">
                <i className="fas fa-shield-alt text-4xl text-amber-400"></i>
              </div>
              <h3 className="font-black text-emerald-50 uppercase tracking-tighter">Regulamento Elysius</h3>
              <p className="text-sm text-emerald-100 leading-relaxed">
                Vencimento fixo entre os dias <b>01 e 05</b>. Após o prazo, o sistema marca o pagamento como "Em Atraso" e o treinador recebe um relatório de adimplência.
              </p>
              <div className="w-full pt-4 border-t border-emerald-800">
                 <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-[0.2em]">Excelência no Esporte</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FinancePage;
